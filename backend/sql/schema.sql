-- =========================================
-- BANCO DE DADOS DO PROJETO
-- PostgreSQL
-- =========================================

-- =========================
-- 1. USUÁRIOS
-- =========================
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(120) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(30) DEFAULT 'user',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 2. PERFIL DO USUÁRIO
-- =========================
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    username VARCHAR(50) UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    age INT,
    country VARCHAR(80),
    city VARCHAR(80),
    preferred_language VARCHAR(20) DEFAULT 'pt-BR',
    experience_points INT DEFAULT 0,
    level INT DEFAULT 1,
    coins INT DEFAULT 0,
    favorite_theme VARCHAR(80),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 3. PLANOS
-- =========================
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(50) NOT NULL,
    slug VARCHAR(50) UNIQUE NOT NULL,
    price DECIMAL(10,2) DEFAULT 0,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    plan_id UUID NOT NULL REFERENCES plans(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'active',
    start_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 4. LIVROS
-- =========================
CREATE TABLE books (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(200) NOT NULL,
    author VARCHAR(150),
    category VARCHAR(80),
    description TEXT,
    cover_url TEXT,
    source_api VARCHAR(100),
    external_id VARCHAR(100),
    rating DECIMAL(3,2),
    language VARCHAR(20) DEFAULT 'pt-BR',
    published_year INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_book_interactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    book_id UUID NOT NULL REFERENCES books(id) ON DELETE CASCADE,
    status VARCHAR(30) DEFAULT 'saved', -- saved, reading, completed, liked
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, book_id)
);

-- =========================
-- 5. MULHERES INSPIRADORAS
-- =========================
CREATE TABLE inspiring_women (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(150) NOT NULL,
    area VARCHAR(100), -- ciência, tecnologia, arte, liderança etc
    biography TEXT,
    image_url TEXT,
    country VARCHAR(80),
    birth_year INT,
    source_api VARCHAR(100),
    external_id VARCHAR(100),
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_women_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    inspiring_woman_id UUID NOT NULL REFERENCES inspiring_women(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, inspiring_woman_id)
);

-- =========================
-- 6. PERSONAGENS DO JOGO
-- =========================
CREATE TABLE game_characters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    title VARCHAR(120),
    description TEXT,
    avatar_url TEXT,
    splash_art_url TEXT,
    strength INT DEFAULT 5,
    defense INT DEFAULT 5,
    speed INT DEFAULT 5,
    intelligence INT DEFAULT 5,
    special_power VARCHAR(150),
    rarity VARCHAR(30) DEFAULT 'common',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 7. GOLPES DOS PERSONAGENS
-- =========================
CREATE TABLE character_moves (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    character_id UUID NOT NULL REFERENCES game_characters(id) ON DELETE CASCADE,
    move_name VARCHAR(100) NOT NULL,
    move_type VARCHAR(50), -- basic, special, ultimate, defense
    damage INT DEFAULT 0,
    energy_cost INT DEFAULT 0,
    cooldown_seconds INT DEFAULT 0,
    animation_key VARCHAR(100),
    effect_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 8. PARTIDAS
-- =========================
CREATE TABLE game_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    player_character_id UUID NOT NULL REFERENCES game_characters(id),
    enemy_character_id UUID REFERENCES game_characters(id),
    result VARCHAR(20), -- win, lose, draw
    total_damage_dealt INT DEFAULT 0,
    total_damage_taken INT DEFAULT 0,
    match_duration_seconds INT DEFAULT 0,
    mode VARCHAR(50) DEFAULT 'story', -- story, ranked, casual
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 9. PROGRESSO NO JOGO
-- =========================
CREATE TABLE user_game_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    current_stage INT DEFAULT 1,
    current_rank VARCHAR(30) DEFAULT 'bronze',
    victories INT DEFAULT 0,
    defeats INT DEFAULT 0,
    total_score INT DEFAULT 0,
    favorite_character_id UUID REFERENCES game_characters(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 10. MISSÕES
-- =========================
CREATE TABLE missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    mission_type VARCHAR(50), -- daily, weekly, story, special
    reward_xp INT DEFAULT 0,
    reward_coins INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_missions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    mission_id UUID NOT NULL REFERENCES missions(id) ON DELETE CASCADE,
    progress INT DEFAULT 0,
    is_completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, mission_id)
);

-- =========================
-- 11. CONQUISTAS
-- =========================
CREATE TABLE achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150) NOT NULL,
    description TEXT,
    icon_url TEXT,
    badge_color VARCHAR(30),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_achievements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    achievement_id UUID NOT NULL REFERENCES achievements(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, achievement_id)
);

-- =========================
-- 12. PROGRESSO GERAL DA PLATAFORMA
-- =========================
CREATE TABLE user_learning_progress (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    area VARCHAR(100), -- tecnologia, liderança, ciência, arte
    progress_percentage DECIMAL(5,2) DEFAULT 0,
    completed_lessons INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 13. FAVORITOS GERAIS
-- =========================
CREATE TABLE user_favorites (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_type VARCHAR(50) NOT NULL, -- book, woman, character
    item_id UUID NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 14. CACHE DE API
-- =========================
CREATE TABLE api_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    cache_key VARCHAR(255) UNIQUE NOT NULL,
    source_name VARCHAR(100),
    response_data JSONB NOT NULL,
    expires_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- 15. LOGS DE EVENTOS
-- =========================
CREATE TABLE user_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    event_type VARCHAR(100) NOT NULL,
    event_data JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- =========================
-- ÍNDICES
-- =========================
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_books_category ON books(category);
CREATE INDEX idx_inspiring_women_area ON inspiring_women(area);
CREATE INDEX idx_game_matches_user_id ON game_matches(user_id);
CREATE INDEX idx_user_events_user_id ON user_events(user_id);
CREATE INDEX idx_api_cache_key ON api_cache(cache_key);

-- =========================
-- DADOS INICIAIS DE PLANOS
-- =========================
INSERT INTO plans (name, slug, price, description) VALUES
('Free', 'free', 0, 'Plano gratuito com acesso básico'),
('Premium', 'premium', 49.90, 'Plano premium com recursos avançados'),
('Master', 'master', 99.90, 'Plano master com experiência completa');
