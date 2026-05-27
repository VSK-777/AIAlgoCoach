package com.vsk.cpanalyzer.dto;

import lombok.Data;
import java.util.List;

@Data
public class CFResponse<T> {
    private String status;
    private List<T> result;
}
