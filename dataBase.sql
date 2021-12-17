CREATE DATABASE online-course-system;

USE online-course-system;

CREATE TABLE public.course (
    title VARCHAR(25) UNIQUE NOT NULL,
    description VARCHAR(50) DEFAULT ''::VARCHAR NOT NULL,
    instructorname VARCHAR(50) NOT NULL,
    idcourse integer PRIMARY KEY
);

CREATE SEQUENCE public.course_idcourse_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.course_idcourse_seq OWNED BY public.course.idcourse;

CREATE TABLE public.instructor (
    name VARCHAR(50) NOT NULL,
    biography VARCHAR(99) DEFAULT ''::VARCHAR NOT NULL,
    password VARCHAR(16) NOT NULL,
    ownedcourses VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
    idinstructor integer PRIMARY KEY
);

CREATE SEQUENCE public.instructor_idinstructor_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.instructor_idinstructor_seq OWNED BY public.instructor.idinstructor;

CREATE TABLE public.student (
    name VARCHAR(50) NOT NULL,
    biography VARCHAR(99) DEFAULT ''::VARCHAR NOT NULL,
    password VARCHAR(16) NOT NULL,
    currentcourses VARCHAR[] DEFAULT ARRAY[]::VARCHAR[],
    idstudent integer PRIMARY KEY
);

CREATE SEQUENCE public.student_idstudent_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.student_idstudent_seq OWNED BY public.student.idstudent;

ALTER TABLE ONLY public.course ALTER COLUMN idcourse SET DEFAULT nextval('public.course_idcourse_seq'::regclass);

ALTER TABLE ONLY public.instructor ALTER COLUMN idinstructor SET DEFAULT nextval('public.instructor_idinstructor_seq'::regclass);

ALTER TABLE ONLY public.student ALTER COLUMN idstudent SET DEFAULT nextval('public.student_idstudent_seq'::regclass);
