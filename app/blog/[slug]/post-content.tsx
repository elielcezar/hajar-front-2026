
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { GetInTouch } from "@/components/GetInTouch";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Calendar, Tag } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Post } from "@/lib/api";
import { SearchBar } from "@/components/SearchBar";

type PostContentProps = {
  post: Post;
};

export default function PostContent({ post }: PostContentProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SearchBar />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Post Header */}
          <div className="mb-8">
            <h1 className="font-aestetico text-3xl md:text-5xl font-medium mb-4 leading-tight">
              {post.titulo}
            </h1>
            <div className="flex items-center gap-x-4 gap-y-2 text-sm text-muted-foreground flex-wrap">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.dataPublicacao}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="h-4 w-4" />
                <Badge variant="outline">{post.categoria}</Badge>
              </div>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8 shadow-lg">
            <Image
              src={post.imagemCapa}
              alt={post.titulo}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 75vw"
              priority
            />
          </div>

          {/* Post Body */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-aestetico prose-a:text-primary hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.conteudo }}
          />

           <Separator className="my-12" />

            {/* Author/Share section can be added here */}
        </div>
      </main>
      <GetInTouch />
      <Footer />
    </div>
  );
}
