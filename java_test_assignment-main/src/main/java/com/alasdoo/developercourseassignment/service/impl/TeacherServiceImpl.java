package com.alasdoo.developercourseassignment.service.impl;

import com.alasdoo.developercourseassignment.dto.TeachertDTO;
import com.alasdoo.developercourseassignment.entity.Teacher;
import com.alasdoo.developercourseassignment.mapper.TeacherMapper;
import com.alasdoo.developercourseassignment.repository.TeacherRepository;
import com.alasdoo.developercourseassignment.service.TeacherService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class TeacherServiceImpl {
   @Autowired
    private TeacherRepository teacherRepository;

    @Autowired
    private TeacherMapper teacherMapper;
    
    @Override
    public TeacherDTO findOne(Integer id) {
        Optional<Teacher> teacher = teacherRepository.findById(id);
        if (!teacher.isPresent()) {
            throw new IllegalArgumentException
                ("Teacher with the following id = " + id + " is not found.");
        }
        return teacherMapper.transformToDTO(teacher.get());
    }
    
    @Override
    public List<TeacherDTO> findAll() {
    	return teacherRepository.findAll()
    			.stream()
    			.map(i -> teacherMapper.transformToDTO(i))
    			.collect(Collectors.toList());
    }
    
    @Override
    public TeacherDTO save(TeacherDTO teacherDTO) {
         Teacher t = teacherMapper.transformToEntity(teacherDTO);
         return teacherMapper.transformToDTO(teacherRepository.save(t));
    }
    
    @Override
    public void remove(Integer id) throws IllegalArgumentException {
        Optional<Teacher> t = teacherRepository.findById(id);
        if (!t.isPresent()) {
            throw new IllegalArgumentException
                ("Teacher with the following id = " + id + " is not found.");
        }
        teacherRepository.deleteById(id);
    }
    
    @Override
    public TeacherDTO update(Integer id, TeacherDTO teacherDTO) {
        Optional<Teacher> oldT = teacherRepository.findById(id);
        if (!oldT.isPresent()) {
            throw new IllegalArgumentException
                ("Teacher with the following id = " + id + " is not found.");
        }
        oldT.get().setTeacherName(teacherDTO.getTeacherName());
        oldT.get().setTeacherSurname(teacherDTO.getTeacherSurname());
        oldT.get().setTeacherEmail(teacherDTO.getTeacherEmail());
        teacherRepository.save(oldT.get());
        return teacherMapper.transformToDTO(oldT.get());
    }
    
    @Override
    public TeacherDTO findByTeacherNameAndTeacherSurname(String name, String surname) {
        Optional<Teacher> teacher = teacherRepository.findByTeacherNameAndTeacherSurname(name,surname);
        if (!teacher.isPresent()) {
            throw new IllegalArgumentException
                ("Teacher with the following name = "+name+" and surname = " + surname + " is not found.");
        }
        return teacherMapper.transformToDTO(teacher.get());
    }
    
    @Override
    public TeacherDTO findByTeacherEmail(String email) {
        Optional<Teacher> teacher = teacherRepository.findByTeacherEmail(email);
        if (!teacher.isPresent()) {
            throw new IllegalArgumentException
                ("Teacher with the following email = " + eamil + " is not found.");
        }
        return teacherMapper.transformToDTO(teacher.get());
    }
}
