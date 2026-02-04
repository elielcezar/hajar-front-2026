
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import Link from "next/link";
import Image from "next/image";
import { Post } from "@/lib/api";

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={post.imagemCapa || "/placeholder.svg"}
              alt={post.titulo}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
          </div>
        </CardHeader>
        <CardContent className="p-6 flex-grow flex flex-col">
           <Badge variant="default" className="w-fit mb-4 bg-primary">{post.categoria}</Badge>
          <CardTitle className="text-xl font-bold leading-snug group-hover:text-primary transition-colors">
            {post.titulo}
          </CardTitle>
          <p className="mt-4 text-muted-foreground text-sm line-clamp-3">
            {post.resumo}
          </p>
        </CardContent>
        <CardFooter className="p-6 pt-0">
            <span className="text-sm font-semibold text-primary group-hover:underline">
              Leia mais
            </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
