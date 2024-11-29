package com.Myfriend.JavaWebsite.payload;


/*
*
*   status: 200
*   desc : ""
*   Data {}
*
* */
public class ReponseData {
    private int Status  = 200;
    private boolean isSuccess = true;
    private String desc;
    private Object data;

    public boolean isSuccess() {
        return isSuccess;
    }

    public void setSuccess(boolean success) {
        isSuccess = success;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public String getDesc() {
        return desc;
    }

    public void setDesc(String desc) {
        this.desc = desc;
    }

    public int getStatus() {
        return Status;
    }

    public void setStatus(int status) {
        Status = status;
    }
}
