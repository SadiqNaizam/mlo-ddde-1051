import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TripCostEstimatorTool from '@/components/TripCostEstimatorTool';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign } from 'lucide-react';

const TripCostEstimatorPage = () => {
  console.log('TripCostEstimatorPage loaded');

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-7xl mx-auto">
          <Card className="border-none shadow-none bg-transparent">
            <CardHeader className="text-center px-0 mb-4">
              <div className="flex justify-center items-center mb-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
              </div>
              <CardTitle className="text-3xl md:text-4xl font-extrabold tracking-tight">
                Trip Cost Estimator
              </CardTitle>
              <CardDescription className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
                Build your perfect Indian adventure. Toggle services, select your preferences, and see the estimated cost update in real-time for full transparency.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              {/* The TripCostEstimatorTool component contains all the interactive elements */}
              <TripCostEstimatorTool />
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TripCostEstimatorPage;