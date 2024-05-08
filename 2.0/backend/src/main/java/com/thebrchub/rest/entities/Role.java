package com.thebrchub.rest.entities;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import static com.thebrchub.rest.entities.Permission.ADMIN_CREATE;
import static com.thebrchub.rest.entities.Permission.ADMIN_DELETE;
import static com.thebrchub.rest.entities.Permission.ADMIN_READ;
import static com.thebrchub.rest.entities.Permission.ADMIN_UPDATE;
import static com.thebrchub.rest.entities.Permission.USER_CREATE;
import static com.thebrchub.rest.entities.Permission.USER_DELETE;
import static com.thebrchub.rest.entities.Permission.USER_READ;
import static com.thebrchub.rest.entities.Permission.USER_UPDATE;

import org.springframework.security.core.authority.SimpleGrantedAuthority;

/**
 * 
 * @author shivanand
 */
public enum Role {

        USER(
                        Set.of(
                                        USER_READ,
                                        USER_UPDATE,
                                        USER_DELETE,
                                        USER_CREATE)),
        ADMIN(
                        Set.of(
                                        ADMIN_READ,
                                        ADMIN_UPDATE,
                                        ADMIN_DELETE,
                                        ADMIN_CREATE,
                                        USER_READ,
                                        USER_UPDATE,
                                        USER_DELETE,
                                        USER_CREATE))

        ;

        private Role(Set<Permission> permissions) {
                this.permissions = permissions;
        }

        private final Set<Permission> permissions;

        public Set<Permission> getPermissions() {
                return permissions;
        }

        public List<SimpleGrantedAuthority> getAuthorities() {
                var authorities = getPermissions()
                                .stream()
                                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
                                .collect(Collectors.toList());
                authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
                return authorities;
        }
}