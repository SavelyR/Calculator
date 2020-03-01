package com.example.calc.controller;

import com.example.calc.domain.Action;
import com.example.calc.domain.ActionRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("action")
public class CalcController {

    ActionRepository actionRepository;

    public CalcController(ActionRepository actionRepository) {
        this.actionRepository = actionRepository;
    }

    @PostMapping
    public Iterable<Action> getHistory() {
        return actionRepository.findAll();
    }

    @PostMapping(path = "/addAll")
    public List<Action> addAllActions(@RequestBody List<Map<String, String>> dataList) {
        List<Action> actList = new ArrayList<>(dataList.size());

        for (int i = 0; i < dataList.size(); i++) {
            actList.add(new Action());
            actList.get(i).setData(dataList.get(i).get("data"));
        }
        actionRepository.saveAll(actList);
        return actList;
    }

    @PostMapping(path = "/drop")
    public void dropAll() {
        actionRepository.deleteAll();
    }



}
