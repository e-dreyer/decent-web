import { extendType, nonNull, objectType } from "nexus";

export const User = objectType({
  name: "User",
  definition(t) {
    t.field("id", {
      type: nonNull("ID"),
    });
    t.field("createdAt", {
      type: nonNull("String"),
    });
    t.field("updatedAt", {
      type: nonNull("String"),
    });
    t.field("username", {
      type: nonNull("String"),
    });
    t.field("email", {
      type: nonNull("String"),
    });
    t.field("profile", {
      type: Profile,
      resolve: async (root, args, { prisma }) => {
        const profile = await prisma.profile.findFirst({
          where: {
            userId: root.id,
          },
        });
        return profile;
      },
    });
    t.list.field("blogs", {
      type: Blog,
      resolve: async (root, args, { prisma }) => {
        const blogs = await prisma.blog.findMany({
          where: {
            authorId: root.id,
          },
        });
        return blogs;
      },
    });
    t.list.field("blogPosts", {
      type: BlogPost,
      resolve: async (root, args, { prisma }) => {
        const blogPosts = await prisma.blogPost.findMany({
          where: {
            authorId: root.id,
          },
        });
        return blogPosts;
      },
    });
    t.list.field("blogComments", {
      type: BlogComment,
      resolve: async (root, args, { prisma }) => {
        const blogComments = await prisma.blogComment.findMany({
          where: {
            authorId: root.id,
          },
        });
        return blogComments;
      },
    });
  },
});

export const Profile = objectType({
  name: "Profile",
  definition(t) {
    t.field("id", {
      type: nonNull("ID"),
    });
    t.field("createdAt", {
      type: nonNull("String"),
    });
    t.field("updatedAt", {
      type: nonNull("String"),
    });
    t.field("user", {
      type: User,
      resolve: async (root, args, { prisma }) => {
        const user = await prisma.user.findFirst({
          where: {
            id: root.userId,
          },
        });
        return user;
      },
    });
    t.int("userId");
    t.string("bio");
  },
});

export const Blog = objectType({
  name: "Blog",
  definition(t) {
    t.field("id", {
      type: nonNull("ID"),
    });
    t.field("createdAt", {
      type: nonNull("String"),
    });
    t.field("updatedAt", {
      type: nonNull("String"),
    });
    t.field("author", {
      type: User,
      resolve: async (root, args, { prisma }) => {
        const user = await prisma.user.findFirst({
          where: {
            id: root.authorId,
          },
        });
        return user;
      },
    });
    t.int("authorId");
    t.string("name");
    t.string("description");
    t.list.field("blogPosts", {
      type: BlogPost,
      resolve: async (root, args, { prisma }) => {
        const blogs = await prisma.blogPost.findMany({
          where: {
            blogId: root.id,
          },
        });
        return blogs;
      },
    });
  },
});

export const BlogPost = objectType({
  name: "BlogPost",
  definition(t) {
    t.field("id", {
      type: nonNull("ID"),
    });
    t.field("createdAt", {
      type: nonNull("String"),
    });
    t.field("updatedAt", {
      type: nonNull("String"),
    });
    t.field("author", {
      type: User,
      resolve: async (root, args, { prisma }) => {
        const user = await prisma.user.findFirst({
          where: {
            id: root.authorId,
          },
        });
        return user;
      },
    });
    t.field("authorId", {
      type: nonNull("Int"),
    });
    t.field("title", {
      type: nonNull("String"),
    });
    t.field("content", {
      type: nonNull("String"),
    });
    t.field("published", {
      type: nonNull("Boolean"),
    });
    t.field("blog", {
      type: Blog,
      resolve: async (root, args, { prisma }) => {
        const blog = await prisma.blog.findFirst({
          where: {
            id: root.blogId,
          },
        });
        return blog;
      },
    });
    t.field("blogId", {
      type: nonNull("Int"),
    });
    t.list.field("blogComments", {
      type: BlogComment,
    });
  },
});

export const BlogComment = objectType({
  name: "BlogComment",
  definition(t) {
    t.field("id", {
      type: nonNull("ID"),
    });
    t.field("createdAt", {
      type: nonNull("String"),
    });
    t.field("updatedAt", {
      type: nonNull("String"),
    });
    t.field("author", {
      type: User,
      resolve: async (root, args, { prisma }) => {
        const user = await prisma.user.findFirst({
          where: {
            id: root.authorId,
          },
        });
        return user;
      },
    });
    t.field("authorId", {
      type: nonNull("Int"),
    });
    t.field("blogPost", {
      type: BlogPost,
      resolve: async (root, args, { prisma }) => {
        const blogPosts = await prisma.blogPosts.findMany({
          where: {
            id: root.blogPostId,
          },
        });
        return blogPosts;
      },
    });
    t.field("blogPostId", {
      type: nonNull("Int"),
    });
    t.field("content", {
      type: nonNull("String"),
    });
    t.field("parent", {
      type: BlogComment,
      resolve: async (root, args, { prisma }) => {
        const blogComment = await prisma.blogComment.findFirst({
          where: {
            id: root.parentId,
          },
        });
        return blogComment;
      },
    });
    t.field("parentId", {
      type: nonNull("Int"),
    });
    t.list.field("blogComments", {
      type: BlogComment,
      resolve: async (root, args, { prisma }) => {
        const blogComments = await prisma.blogComment.findMany({
          where: {
            parentId: root.id,
          },
        });
        return blogComments;
      },
    });
  },
});

export const allUsersQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("users", {
      type: User,
      resolve: async (_, __, { prisma }) => {
        const users = await prisma.user.findMany();
        return users;
      },
    });
  },
});

export const allProfilesQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("profiles", {
      type: Profile,
      resolve: async (_, __, { prisma }) => {
        const profiles = await prisma.profile.findMany();
        return profiles;
      },
    });
  },
});

export const allBlogsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("blogs", {
      type: Blog,
      resolve: async (_, __, { prisma }) => {
        const blogs = await prisma.blog.findMany();
        return blogs;
      },
    });
  },
});

export const allBlogPostsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("blogPosts", {
      type: BlogPost,
      resolve: async (_, __, { prisma }) => {
        const blogPosts = await prisma.blogPost.findMany();
        return blogPosts;
      },
    });
  },
});

export const allBlogCommentsQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("blogComments", {
      type: BlogComment,
      resolve: async (_, __, { prisma }) => {
        const blogComments = await prisma.blogComment.findMany();
        return blogComments;
      },
    });
  },
});
