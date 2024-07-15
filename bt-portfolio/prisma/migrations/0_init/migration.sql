-- CreateTable
CREATE TABLE `projects` (
    `project_id` INTEGER NOT NULL AUTO_INCREMENT,
    `project_name` VARCHAR(50) NULL,
    `project_date` DATE NOT NULL,
    `imageSrc` VARCHAR(50) NOT NULL,
    `image_altText` VARCHAR(100) NOT NULL,
    `thumbnail_imageSrc` VARCHAR(50) NOT NULL,
    `thumbnail_altText` VARCHAR(50) NULL,
    `description_short` VARCHAR(250) NOT NULL,
    `descripition_long` VARCHAR(1000) NOT NULL,

    UNIQUE INDEX `project_id`(`project_id`),
    PRIMARY KEY (`project_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

