package com.Myfriend.JavaWebsite.Service;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.Myfriend.JavaWebsite.Service.Imp.FileServiceImp;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileService implements FileServiceImp {

    private static final Logger logger = LoggerFactory.getLogger(FileService.class);

    @Value("${fileUpload.rootpath}")
    private String rootPath;
    private Path root;

    // Khởi tạo thư mục gốc
    private void init() {
        try {
            if (rootPath == null || rootPath.isEmpty()) {
                logger.error("Root path is not configured correctly.");
                return;
            }

            root = Paths.get(rootPath);
            if (Files.notExists(root)) {
                Files.createDirectories(root);
                logger.info("Directory created at: {}", rootPath);
            }

        } catch (Exception e) {
            logger.error("Error creating root folder: {}", e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public boolean saveFile(MultipartFile file) {
        if (file == null || file.isEmpty() || file.getOriginalFilename().isEmpty()) {
            logger.warn("File is null, empty, or has no filename.");
            return false;
        }

        String originalFilename = file.getOriginalFilename();
        logger.info("Saving file: {}", originalFilename);

        try {
            init();

            // Đảm bảo thư mục root đã tồn tại
            if (root == null) {
                logger.error("Root path is not initialized.");
                return false;
            }

            // Kiểm tra quyền ghi vào thư mục
            if (!Files.isWritable(root)) {
                logger.error("No write permissions to the root directory.");
                return false;
            }

            // Tạo tên file duy nhất (để tránh trùng lặp)
            String uniqueFilename = System.currentTimeMillis() + "_" + originalFilename;
            Path targetLocation = root.resolve(uniqueFilename);

            // Lưu file vào thư mục
            Files.copy(file.getInputStream(), targetLocation, StandardCopyOption.REPLACE_EXISTING);
            logger.info("File saved successfully: {}", uniqueFilename);

            return true;
        } catch (Exception e) {
            logger.error("Error saving file: {}", e.getMessage());
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Resource loadFile(String filename) {
        try {
            init();
            if (root == null) {
                logger.error("Root path is not initialized.");
                return null;
            }

            Path filePath = root.resolve(filename);
            Resource resource = new UrlResource(filePath.toUri());

            // Kiểm tra xem file có tồn tại và có thể đọc được không
            if (resource.exists() && resource.isReadable()) {
                logger.info("File loaded successfully: {}", filename);
                return resource;
            } else {
                logger.warn("File does not exist or is not readable: {}", filename);
            }

        } catch (Exception e) {
            logger.error("Error loading file: {}", e.getMessage());
            e.printStackTrace();
        }
        return null;
    }
}