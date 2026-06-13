import {
  Compass, Target, Network, Users, Scale, HandCoins, MessageSquare, FileText,
  Mic, Building2, ArrowUpRight, Heart, Clock,
  Cog, Wrench, Cpu, ShieldAlert, Atom, BarChart3,
  LineChart, Gauge, Package, Recycle, Users2, Wallet, Store,
  RefreshCw, GitBranch, GraduationCap, Briefcase, Sparkles, Rocket,
  HelpCircle
} from "lucide-react";
import React from "react";

export const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Compass, Target, Network, Users, Scale, HandCoins, MessageSquare, FileText,
  Mic, Building2, ArrowUpRight, Heart, Clock,
  Cog, Wrench, Cpu, ShieldAlert, Atom, BarChart3,
  LineChart, Gauge, Package, Recycle, Users2, Wallet, Store,
  RefreshCw, GitBranch, GraduationCap, Briefcase, Sparkles, Rocket,
};

export const getIcon = (name: string): React.ComponentType<{ className?: string }> => {
  return iconMap[name] || HelpCircle;
};
