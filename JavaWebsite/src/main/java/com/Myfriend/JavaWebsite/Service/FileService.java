package com.Myfriend.JavaWebsite.Service;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import com.Myfriend.JavaWebsite.Service.Imp.FileServiceImp;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;


@Service
public class FileService implements FileServiceImp {


    @Value("${fileUpload.rootpath}")

    private String rootPath;
    private Path root;

    private void init() {
        try {
            root = Paths.get(rootPath);
            if (Files.notExists(root)) {
                Files.createDirectories(root);
            }

        } catch (Exception e) {
            System.out.println("Error create folder root:  " + e.getMessage());
        }


    }


    @Override
    public boolean saveFile(MultipartFile file) {
        try {
            init();
            if (file == null || file.isEmpty()) {
                System.out.println("File is null or empty");
                return false;
            }

            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null) {
                System.out.println("Original filename is null");
                return false;
            }

            System.out.println("File name: " + originalFilename);
            Files.copy(file.getInputStream(), root.resolve(file.getOriginalFilename()), StandardCopyOption.REPLACE_EXISTING);
            return true;

        } catch (Exception e) {
            System.out.println("Error saving file:  " + e.getMessage());
            return false;
        }
    }

    @Override
    public Resource loadFile(String filename) {
        try {
            init();
            Path file = root.resolve(filename);
            Resource resource = new UrlResource(file.toUri());
            if (resource.exists() || resource.isReadable()) {
                return resource;
            }
        } catch (Exception e) {
            System.out.println("Error loading file:  " + e.getMessage());

        }
            return null;
    }

}