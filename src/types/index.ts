import { z } from "zod";

export const User = z.object({
  id: z.string(),
});

export type User = z.infer<typeof User>;

export const Profile = z.object({
  id: z.string(),
  user: z.string(),
  username: z.string().optional(),
  bio: z.string().optional(),
});

export type Profile = z.infer<typeof Profile>;

export const Blog = z.object({
  id: z.string(),
  user: z.string(),
  name: z.string(),
});

export type Blog = z.infer<typeof Blog>;

export const BlogPost = z.object({
  id: z.string(),
  user: z.string(),
  blog: z.string(),
  title: z.string(),
  body: z.string(),
});

export type BlogPost = z.infer<typeof BlogPost>;

export const BlogComment = z.object({
  id: z.string(),
  user: z.string(),
  post: z.string(),
  parent: z.string().optional(),
  body: z.string(),
});

export type BlogComment = z.infer<typeof BlogComment>;
