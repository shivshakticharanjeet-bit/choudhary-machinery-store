import * as React from "react";
import { storeService } from "@/src/lib/storeService";
import ProductCard from "@/src/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Search, Cpu } from "lucide-react";

export default function Machinery() {
  const [search, setSearch] = useState("");
  const machinery = storeService.getProducts().filter(
    p => p.category === 'machine' && p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center">
            <Cpu className="mr-3 h-8 w-8 text-primary" />
            Screw-Making Machinery
          </h1>
          <p className="text-muted-foreground">Advanced industrial machines for efficient screw production.</p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search machinery..."
            className="pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {machinery.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {machinery.map((machine) => (
            <ProductCard key={machine.id} product={machine} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No machinery found matching your search.</p>
        </div>
      )}

      {/* Machinery CTA */}
      <section className="mt-20 p-12 rounded-3xl bg-primary text-white overflow-hidden relative">
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-3xl font-bold mb-4">Need a Custom Production Line?</h2>
          <p className="text-primary-foreground/90 text-lg mb-8">
            Our engineers can design and set up a complete screw manufacturing plant tailored to your specific output requirements.
          </p>
          <Button size="lg" variant="secondary" className="h-12 px-8">
            Request Consultation
          </Button>
        </div>
        <Cpu className="absolute -right-10 -bottom-10 h-64 w-64 text-white/10 rotate-12" />
      </section>
    </div>
  );
}
