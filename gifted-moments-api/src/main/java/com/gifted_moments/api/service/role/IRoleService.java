package com.gifted_moments.api.service.role;

import java.util.List;

import com.gifted_moments.api.entity.Role;



public interface IRoleService {
    Role createRole(Role role);
    Role updateRole(Long roleId, Role role);
    void deleteRole(Long roleId);
    Role getRoleById(Long roleId);
    List<Role> getAllRoles();
}
