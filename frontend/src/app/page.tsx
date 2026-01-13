import PredictForm from "@/components/PredictForm";
import GetStartedButton from "@/components/GetStartedButton";
import DisclaimerCard from "@/components/DisclaimerCard";
import Footer from "@/components/Footer";
import { Shield, Activity, Share2, Heart, TrendingUp, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen gradient-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Hero Section */}
        <section className="text-center space-y-8 pt-8 md:pt-12 animate-fadeIn">
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-card border-blue-500/30">
            <Shield className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">
              Clinical Grade AI Prediction
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
            <span className="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 bg-clip-text text-transparent">
              CardioGuard
            </span>
            <span className="block text-2xl md:text-4xl mt-4 font-light text-gray-400">
              Intelligent Cardiovascular Risk Assessment
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            An advanced machine learning tool for early detection of
            cardiovascular risks. Powered by XGBoost and SHAP for interpretable
            medical AI.
          </p>

          <GetStartedButton />
        </section>

        {/* The Main Application Form */}
        <section id="predict-form" className="mt-16 md:mt-24 animate-fadeIn">
          <PredictForm />
        </section>

        {/* Disclaimer Section */}
        <section>
          <DisclaimerCard />
        </section>

        <Footer />
        
      </div>
    </div>
  );
}
