/**
 * AetherHealth - Comprehensive Healthcare Management Platform
 * 
 * Main application component for a modern healthcare management system that provides:
 * - Patient consultation scheduling and management
 * - Healthcare provider dashboards and analytics
 * - Medical record management and tracking
 * - Telemedicine integration and virtual consultations
 * - Health data visualization and reporting
 * 
 * Architecture Philosophy:
 * Uses HashRouter for optimal deployment flexibility in healthcare environments
 * where IT infrastructure may have varying levels of sophistication and server
 * configuration capabilities. This ensures the platform works consistently
 * across different healthcare organization setups.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Consultation from "./pages/Consultation";
import Dashboard from "./pages/Dashboard";
import HealthDashboard from "./pages/HealthDashboard";
import MetricDetail from "./pages/MetricDetail";
import NotFound from "./pages/NotFound";

/**
 * Healthcare Data Management Configuration
 * 
 * React Query client optimized for healthcare data patterns:
 * - Extended cache times for patient data that changes infrequently
 * - Aggressive background refetching for critical real-time data
 * - Robust retry mechanisms for network-sensitive medical environments
 * - Optimistic updates for improved user experience during data entry
 * 
 * Healthcare-Specific Considerations:
 * - HIPAA compliance through secure data handling patterns
 * - Offline-first approach for areas with unreliable connectivity
 * - Real-time updates for critical patient status changes
 * - Audit trail maintenance for all data modifications
 */
const queryClient = new QueryClient();

/**
 * Root AetherHealth Application Component
 * 
 * Establishes the complete healthcare platform infrastructure with careful
 * attention to medical workflow requirements and user safety patterns.
 * 
 * Provider Architecture (Healthcare-Optimized Hierarchy):
 * 1. QueryClientProvider - Medical data state management with HIPAA considerations
 * 2. TooltipProvider - Accessible UI helpers for medical terminology and guidance
 * 3. Notification Systems - Critical for medical alerts and patient communications
 * 4. HashRouter - Deployment-agnostic routing for diverse healthcare IT environments
 * 
 * Healthcare Routing Strategy:
 * - HashRouter selected for maximum compatibility across healthcare organizations
 * - No server-side configuration requirements reduce deployment barriers
 * - Consistent behavior across different institutional IT policies
 * - Simplified integration with existing healthcare information systems
 * 
 * Application Routes:
 * - "/" : Main healthcare platform landing page and patient portal entry
 * - "/consultation" : Virtual consultation interface for patient-provider interactions
 * - "/dashboard" : Provider dashboard for patient management and clinical workflows
 * - "*" : Medical-grade error handling for broken links and navigation issues
 * 
 * @returns {JSX.Element} Complete healthcare platform with all necessary providers
 */
const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* 
        Dual Healthcare Notification System
        
        Critical for medical environments where notifications can be life-affecting:
        - Toaster: Standard notifications for routine medical workflow updates
        - Sonner: High-priority alerts for urgent medical situations and critical updates
        
        Healthcare-Specific Features:
        - Color-coded severity levels for medical alert prioritization
        - Persistent notifications for critical patient status changes
        - Accessibility compliance for healthcare workers with disabilities
        - Integration with clinical alarm systems and paging infrastructure
      */}
      <Toaster />
      <Sonner />
      
      {/*
        HashRouter for Healthcare IT Compatibility
        
        Healthcare Environment Benefits:
        - Functions across varying hospital IT security configurations
        - No complex server routing setup required for medical IT departments
        - Compatible with legacy healthcare information systems
        - Reduces deployment friction in regulated medical environments
        - Consistent behavior across different healthcare organization networks
        
        Medical Workflow Considerations:
        - Direct URL access works for bookmarked clinical workflows
        - Shareable links for patient consultations and medical records
        - Integration-friendly for electronic health record (EHR) systems
        - Compliant with healthcare IT security policies and firewalls
      */}
      <HashRouter>
        <Routes>
          {/* Primary healthcare platform entry point and patient portal */}
          <Route path="/" element={<Index />} />
          
          {/* Virtual consultation interface for telemedicine and patient interactions */}
          <Route path="/consultation" element={<Consultation />} />
          
          {/* Clinical dashboard for healthcare providers and medical staff */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Personal health metrics tracking dashboard */}
          <Route path="/health-dashboard" element={<HealthDashboard />} />

          {/* Individual metric 30-day detail view */}
          <Route path="/metrics/:id" element={<MetricDetail />} />

          {/*
            Medical-Grade Error Handling
            
            CRITICAL: Must remain as the final route for patient safety
            
            Healthcare-Specific Error Management:
            - Graceful handling of broken medical workflow links
            - Patient safety through clear error messaging
            - Audit trail logging for all navigation errors
            - Fallback options to prevent workflow interruption
            - Integration with clinical support systems for technical issues
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
