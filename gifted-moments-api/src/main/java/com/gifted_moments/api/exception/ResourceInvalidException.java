package com.gifted_moments.api.exception;

public class ResourceInvalidException extends RuntimeException {
    public ResourceInvalidException(String message){
        super(message);
    }
}