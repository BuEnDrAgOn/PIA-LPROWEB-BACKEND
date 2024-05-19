-- CreateTable
CREATE TABLE "categories" (
    "category_id" SERIAL NOT NULL,
    "category" VARCHAR(100) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id")
);

-- CreateTable
CREATE TABLE "consoles" (
    "console_id" SERIAL NOT NULL,
    "console" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "consoles_pkey" PRIMARY KEY ("console_id")
);

-- CreateTable
CREATE TABLE "fqa" (
    "fqa_id" SERIAL NOT NULL,
    "fqa_user" INTEGER NOT NULL,
    "fqa_title" VARCHAR(50) NOT NULL,
    "fqa_answer" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fqa_pkey" PRIMARY KEY ("fqa_id")
);

-- CreateTable
CREATE TABLE "games" (
    "game_id" SERIAL NOT NULL,
    "game_name" VARCHAR(100) NOT NULL,
    "game_banner" VARCHAR(500),
    "game_score" DECIMAL DEFAULT 0,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "games_category" (
    "game_id" INTEGER NOT NULL,
    "category_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_category_pkey" PRIMARY KEY ("game_id","category_id")
);

-- CreateTable
CREATE TABLE "games_info" (
    "game_id" INTEGER NOT NULL,
    "game_sinopsis" TEXT NOT NULL,
    "game_features_specific" TEXT,
    "game_features_general" TEXT,
    "game_fpage" BYTEA,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_info_pkey" PRIMARY KEY ("game_id")
);

-- CreateTable
CREATE TABLE "user_question" (
    "question_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "question_info" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_question_pkey" PRIMARY KEY ("question_id")
);

-- CreateTable
CREATE TABLE "user_score" (
    "user_id" INTEGER NOT NULL,
    "game_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "score" INTEGER,

    CONSTRAINT "user_score_pkey" PRIMARY KEY ("user_id","game_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "user_name" VARCHAR(50) NOT NULL,
    "user_email" VARCHAR(100) NOT NULL,
    "user_password" VARCHAR(50) NOT NULL,
    "user_role" INTEGER NOT NULL DEFAULT 1,
    "user_token" INTEGER,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "games_console" (
    "game_id" INTEGER NOT NULL,
    "console_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "games_console_pkey" PRIMARY KEY ("game_id","console_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "roles_id" SERIAL NOT NULL,
    "role_name" VARCHAR(15) NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("roles_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_category_key" ON "categories"("category");

-- CreateIndex
CREATE UNIQUE INDEX "consoles_console_key" ON "consoles"("console");

-- CreateIndex
CREATE UNIQUE INDEX "games_game_name_key" ON "games"("game_name");

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "roles_role_name_key" ON "roles"("role_name");

-- AddForeignKey
ALTER TABLE "fqa" ADD CONSTRAINT "fqa_fqa_user_fkey" FOREIGN KEY ("fqa_user") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games_category" ADD CONSTRAINT "games_category_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games_category" ADD CONSTRAINT "games_category_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games_info" ADD CONSTRAINT "games_info_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_question" ADD CONSTRAINT "user_question_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_score" ADD CONSTRAINT "user_score_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_score" ADD CONSTRAINT "user_score_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_user_role_fkey" FOREIGN KEY ("user_role") REFERENCES "roles"("roles_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games_console" ADD CONSTRAINT "fk_consoles" FOREIGN KEY ("console_id") REFERENCES "consoles"("console_id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "games_console" ADD CONSTRAINT "games_console_game_id_fkey" FOREIGN KEY ("game_id") REFERENCES "games"("game_id") ON DELETE CASCADE ON UPDATE NO ACTION;
