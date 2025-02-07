package com.gifted_moments.api.util;

import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.stereotype.Component;

import com.gifted_moments.api.entity.Brand;
import com.gifted_moments.api.entity.Category;
import com.gifted_moments.api.entity.Occasion;
import com.gifted_moments.api.entity.Role;
import com.gifted_moments.api.entity.User;
import com.gifted_moments.api.repository.BrandRepository;
import com.gifted_moments.api.repository.CategoryRepository;
import com.gifted_moments.api.repository.OccasionRepository;
import com.gifted_moments.api.repository.RoleRepository;
import com.gifted_moments.api.repository.UserRepository;
import com.gifted_moments.api.service.role.IRoleService;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class DataInitializer implements ApplicationListener<ApplicationReadyEvent> {
    final RoleRepository roleRepository;
    final UserRepository userRepository;
    final CategoryRepository categoryRepository;
    final BrandRepository brandRepository;
    final OccasionRepository occasionRepository;
    final IRoleService roleService;

    @Override
    public void onApplicationEvent(@SuppressWarnings("null") ApplicationReadyEvent event) {
        createRoleIfNotExists();
        createUsersIfNotExists();
        createCategoryAreaStatus();
    }

    private void createRoleIfNotExists() {
        String[] roles = { "ADMIN", "USER", "SELLER" };

        for (String roleName : roles) {
            String role = "ROLE_" + roleName;

            if (roleRepository.existsByRoleName(role)) {
                continue;
            }

            Role roleEntity = new Role();
            roleEntity.setRoleName(role);
            roleRepository.save(roleEntity);
            System.out.println("Role created: " + role);
        }
    }

    private void createUsersIfNotExists() {

        User user = new User();
        user.setUserName("Admin");
        user.setUserName("admin");
        user.setEmailId("admin@gmail.com");
        user.setPassword("admin123");
        user.setContactNo("987456321");
        user.setAddress("Pune");
        user.setRole(roleService.getRoleById(1L));

        if (userRepository.existsByEmailId(user.getEmailId())) {
            return;
        }

        userRepository.save(user);

        System.out.println("User created: " + user.getUserName());

    }

    private void createCategoryAreaStatus() {
        String[][] categories = {
            {"Men's Apparel", "Includes premium formal and casual wear for men from brands like Allen Solly, Raymond, and Peter England."},
            {"Women's Fashion", "Trendy and ethnic clothing for women from brands like Biba, Global Desi, and W for Woman."},
            {"Footwear", "Stylish and comfortable shoes from brands like Woodland, Red Tape, Bata, Liberty, and Metro Shoes."},
            {"Watches & Accessories", "Luxury and everyday watches and accessories from brands like Fastrack, Titan, and Vincent Chase."},
            {"Handbags & Leather Goods", "Premium handbags and wallets from Da Milano, Caprese, Lavie, and Hidesign."},
            {"Jewelry", "Elegant gold and diamond jewelry collections from Tanishq, PC Jeweller, and Kalyan Jewellers."},
            {"Travel Gear", "Durable travel bags and backpacks from Wildcraft, Skybags, and American Tourister."},
            {"Home Furnishings", "High-quality home décor and furnishing from Bombay Dyeing, Spaces, Portico, D'Décor, Trident, and Welspun."},
            {"Beauty & Skincare", "Natural and cosmetic beauty products from Forest Essentials, Nykaa, Khadi Natural, Plum, and Lotus Herbals."},
            {"Furniture & Home Decor", "Premium furniture and home decor solutions from Urban Ladder, Pepperfry, and Home Centre."}
        };

        String[] brands = {
                "Allen Solly", "Raymond", "Peter England",
                "Biba", "Global Desi", "W for Woman",
                "Woodland", "Red Tape", "Hidesign",
                "Bata", "Liberty", "Metro Shoes",
                "Fastrack", "Titan", "Vincent Chase",
                "Da Milano", "Caprese", "Lavie",
                "Tanishq", "PC Jeweller", "Kalyan Jewellers",
                "Wildcraft", "Skybags", "American Tourister",
                "Pashmoda", "Shingora", "Weavers Villa",
                "Bombay Dyeing", "Spaces", "Portico",
                "D’Décor", "Trident", "Welspun",
                "FabIndia", "Swayam", "Linenwalas",
                "Story@Home", "Berkshire", "Solimo",
                "Ajanta", "Sonata", "Chumbak",
                "Urban Ladder", "Pepperfry", "Home Centre",
                "VarEesha", "ExclusiveLane", "Craftsman",
                "Forest Essentials", "Nykaa", "Khadi Natural",
                "Plum", "Biotique", "Lotus Herbals",
                "Himalaya", "Vaadi Herbals", "Aroma Magic",
                "VLCC", "Joy", "Mamaearth",
                "Khadi Essentials", "Just Herbs", "WOW Skin Science"
        };
       
        String[] occasions = {
            "Wedding",
            "Festivals",
            "Business Meetings",
            "Casual Outings",
            "Travel & Vacations",
            "Formal Events",
            "Sports & Outdoor Activities",
            "Housewarming",
            "Birthdays & Anniversaries",
            "Gifting & Celebrations"
        };

        for (String occasion : occasions) {
            if (!occasionRepository.existsByOccasionName(occasion)) {
                Occasion sa = new Occasion();
                sa.setOccasionName(occasion);
                occasionRepository.save(sa);
            }
        }

        for (String[] category : categories) {
            if (!categoryRepository.existsByCategoryName(category[0])) {
                Category sa = new Category();
                sa.setCategoryName(category[0]);
                sa.setCategoryDescription(category[1]);
                categoryRepository.save(sa);
            }
        }

    
        for (String brand : brands) {
            if (!brandRepository.existsByBrandName(brand)) {
                Brand sa = new Brand();
                sa.setBrandName(brand);
                brandRepository.save(sa);
            }
        }

    }

}
