
import { getPosts } from "@/lib/api";
import PostCard from "@/components/PostCard";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";
import { SearchBar } from "@/components/SearchBar";

export default async function BlogContent() {
  const posts = await getPosts();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchBar />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
            <h1 className="font-aestetico text-4xl md:text-5xl font-medium mb-4">
                Nosso Blog
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Fique por dentro das últimas novidades e tendências do mercado imobiliário.
            </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">
              Nenhuma publicação encontrada no momento.
            </p>
          </div>
        )}
      </main>
      <GetInTouch />
      <Footer />
    </div>
  );
}
