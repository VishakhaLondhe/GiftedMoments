package com.gifted_moments.api.util;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

import org.springframework.web.multipart.MultipartFile;

public class HelperFunctions {

    private HelperFunctions(){
        throw new IllegalStateException("Util Class");
    }

    public static String saveImage(MultipartFile image) throws IOException {
        String projectRoot = System.getProperty("user.dir");

      
        String uploadDir = projectRoot + "/uploads/";

        Path uploadPath = Paths.get(uploadDir);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = image.getOriginalFilename();
        String extension = fileName != null ? fileName.substring(fileName.lastIndexOf('.')) : "";
        String uniqueFileName = UUID.randomUUID() + extension;

        // Save the file
        Path filePath = uploadPath.resolve(uniqueFileName);
        image.transferTo(filePath);

        return "http://localhost:9090/uploads/" + uniqueFileName;

    }

    public static void deleteImage(String imageUrl) throws IOException {
    
        String filename = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);

        String projectRoot = System.getProperty("user.dir");
        String uploadDir = projectRoot + "/uploads/";

        Path filePath = Paths.get(uploadDir + filename);
        File file = filePath.toFile();

        if (file.exists()) {
            if (!file.delete()) {
                throw new IOException("Failed to delete image: " + filePath);
            }
        } else {
            throw new IOException("Image not found: " + filePath);
        }
    }

}
