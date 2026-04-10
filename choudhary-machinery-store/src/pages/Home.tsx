import * as React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Hammer, Settings, ShieldCheck, Truck } from "lucide-react";
import { motion } from "motion/react";
import { storeService } from "@/src/lib/storeService";
import ProductCard from "@/src/components/ProductCard";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const featuredProducts = storeService.getProducts().slice(0, 3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center overflow-hidden bg-muted">
        <div className="absolute inset-0 z-0">
          <img
            src="https://picsum.photos/seed/factory/1920/1080?blur=2"
            alt="Factory Background"
            className="w-full h-full object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Precision Engineering for <span className="text-primary">Every Fastener.</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Choudhary Machinery Store provides industry-leading screw-making machines and high-quality screws for global manufacturing needs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild size="lg" className="h-12 px-8 text-lg">
                <Link to="/machinery">
                  Explore Machinery
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 px-8 text-lg">
                <Link to="/products">View Screws</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Hammer, title: "Custom Design", desc: "Tailored screw solutions for your specific needs." },
              { icon: Settings, title: "High Precision", desc: "Advanced machinery with micron-level accuracy." },
              { icon: ShieldCheck, title: "Quality Assured", desc: "Rigorous testing protocols for every product." },
              { icon: Truck, title: "Global Delivery", desc: "Fast and reliable shipping to over 50 countries." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
              <p className="text-muted-foreground">Our most popular screws and machinery.</p>
            </div>
            <Button asChild variant="ghost">
              <Link to="/products">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img
                src="https://picsum.photos/seed/workshop/800/600"
                alt="Workshop"
                className="rounded-3xl shadow-2xl relative z-10"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-primary rounded-3xl z-0" />
            </div>
            <div className="space-y-6">
              <Badge variant="outline" className="text-primary border-primary">Since 1995</Badge>
              <h2 className="text-4xl font-bold">A Legacy of Excellence in Machinery.</h2>
              <p className="text-lg text-muted-foreground">
                For over nearly three decades, Choudhary Machinery Store has been at the forefront of the fastener industry. We don't just sell machines; we provide the foundation for your manufacturing success.
              </p>
              <ul className="space-y-4">
                {[
                  "ISO 9001:2015 Certified Manufacturing",
                  "Expert Technical Support & Training",
                  "Genuine Spare Parts Availability",
                  "Energy Efficient Machinery Designs"
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-secondary rounded-full flex items-center justify-center">
                      <ShieldCheck className="h-3 w-3 text-white" />
                    </div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg">
                <Link to="/contact">Learn More About Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
