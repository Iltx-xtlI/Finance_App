import NextAuth, { AuthOptions, DefaultSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// Define the authOptions
const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Enter your username" },
        password: { label: "Password", type: "password", placeholder: "Enter your password" }
      },
      async authorize(credentials) {
        const user = { id: '1', name: 'User', username: 'user', password: 'password' }; // Example user
        if (credentials?.username === user.username && credentials?.password === user.password) {
          return user; // Return user object if credentials are valid
        }
        return null; // Return null if credentials are invalid
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin', // Custom sign-in page
  },
  session: {
    strategy: 'jwt', // Use JWT for session management
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Add user ID to the token
      }
      return token; // Ensure token is returned correctly
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Ensure token.id is treated as a string
      }
      return session;
    },
  },
};

// Extend the DefaultSession interface to include the user ID
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      username: string;
    } & DefaultSession['user'];
  }
}

// Export the NextAuth handler
export default NextAuth(authOptions); 