import { Product, formatINR } from "@/src/lib/storeService";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Info } from "lucide-react";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
  key?: string | number;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="overflow-hidden group flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <Badge className="absolute top-2 right-2 bg-primary/90 hover:bg-primary">
          {product.category === 'screw' ? 'Screw' : 'Machine'}
        </Badge>
      </div>
      <CardHeader className="p-4 flex-grow">
        <CardTitle className="text-lg line-clamp-1">{product.name}</CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-2">
          {product.description}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            {formatINR(product.price)}
            {product.category === 'screw' && <span className="text-xs font-normal text-muted-foreground ml-1">/pc</span>}
          </span>
          {product.specs && (
            <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
              {Object.keys(product.specs)[0]}: {Object.values(product.specs)[0]}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button asChild variant="outline" className="flex-1">
          <Link to={`/contact?product=${product.id}`}>
            <Info className="mr-2 h-4 w-4" />
            Inquire
          </Link>
        </Button>
        <Button className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
