import React, { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar";
import { MobileNav } from "./components/MobileNav";
import { QRScannerModal } from "./components/QRScannerModal";
import { OfflineSyncModal } from "./components/OfflineSyncModal";
import { LoginModal } from "./components/LoginModal";
import { QRPrintModal } from "./components/QRPrintModal";
import { ProtectedShell } from "./components/layout/ProtectedShell";
import { LoginPage } from "./pages/LoginPage";
import { LandingPage } from "./pages/LandingPage";
import { PublicTracePage } from "./pages/PublicTracePage";
import { FarmerDashboard } from "./pages/FarmerDashboard";
import { ProcessorDashboard } from "./pages/ProcessorDashboard";
import { DistributorDashboard } from "./pages/DistributorDashboard";
import { RetailerDashboard } from "./pages/RetailerDashboard";
import { AuthorityDashboard } from "./pages/AuthorityDashboard";
import { AdminDashboard } from "./pages/AdminDashboard";

import { UserRole, SupportedLanguage, Batch, SupplyChainEvent, RecallNotice, RiskAlert, UserProfile } from "./types";
import { seedInitialMockData, getAllBatches, getAllEvents, getAllRecalls, getSyncQueue } from "./lib/db";
import { detectRisksAndAnomalies } from "./lib/riskEngine";
import { OfflineSyncManager } from "./lib/offlineSync";

// Demo Stakeholder Users
export const DEMO_USERS: Record<UserRole, UserProfile> = {
  FARMER: {
    id: "usr-farmer-01",
    name: "Ramesh Patil",
    role: "FARMER",
    organization: "Sahyadri Farmers Producer Co-op",
    district: "Pune",
    state: "Maharashtra",
    address: "Khed Shivapur, Pune, MH",
    fssaiNumber: "FSSAI-10020022001111",
    email: "farmer@sahyadri.org",
  },
  PROCESSOR: {
    id: "usr-processor-01",
    name: "Suresh Agro Processing",
    role: "PROCESSOR",
    organization: "Sahyadri Agro Processing Plant",
    district: "Pune",
    state: "Maharashtra",
    address: "MIDC Bhosari Industrial Area, Pune, MH",
    fssaiNumber: "FSSAI-10019022009812",
    email: "processor@sahyadriagro.in",
  },
  DISTRIBUTOR: {
    id: "usr-distributor-01",
    name: "Mahindra Cold Logistics",
    role: "DISTRIBUTOR",
    organization: "Mahindra Logistics Cold Chain Division",
    district: "Thane",
    state: "Maharashtra",
    address: "Bhiwandi Logistics Park, Thane, MH",
    fssaiNumber: "FSSAI-10018022003322",
    email: "distributor@mahindralogistics.com",
  },
  WAREHOUSE: {
    id: "usr-warehouse-01",
    name: "Snowman Cold Storage",
    role: "WAREHOUSE",
    organization: "Snowman Cold Storage Hub",
    district: "Mumbai",
    state: "Maharashtra",
    address: "Taloja MIDC, Navi Mumbai, MH",
    fssaiNumber: "FSSAI-10017022004433",
    email: "warehouse@snowmancold.com",
  },
  TRANSPORTER: {
    id: "usr-transporter-01",
    name: "FastFreight Reefer Fleet",
    role: "TRANSPORTER",
    organization: "FastFreight Logistics",
    district: "Pune",
    state: "Maharashtra",
    address: "Chakan Express Hub, Pune, MH",
    fssaiNumber: "FSSAI-10016022005544",
    email: "transporter@fastfreight.in",
  },
  RETAILER: {
    id: "usr-retailer-01",
    name: "NatureFresh Supermarket",
    role: "RETAILER",
    organization: "NatureFresh Retail Ltd",
    district: "Thane",
    state: "Maharashtra",
    address: "Ghodbunder Road, Thane West, MH",
    fssaiNumber: "FSSAI-10015022006655",
    email: "retailer@naturefresh.com",
  },
  CONSUMER: {
    id: "usr-consumer-01",
    name: "Ananya Sharma",
    role: "CONSUMER",
    organization: "Consumer Citizen",
    district: "Mumbai",
    state: "Maharashtra",
    address: "Bandra West, Mumbai",
    email: "consumer@citizen.in",
  },
  AUTHORITY: {
    id: "usr-authority-01",
    name: "Dr. V. K. Deshmukh",
    role: "AUTHORITY",
    organization: "FSSAI Regional Inspection Directorate",
    district: "Mumbai",
    state: "Maharashtra",
    address: "FDA Bhavan, Bandra Kurla Complex, Mumbai",
    fssaiNumber: "FSSAI-10000000000001",
    email: "inspector@fssai.gov.in",
  },
  ADMIN: {
    id: "usr-admin-01",
    name: "System Admin",
    role: "ADMIN",
    organization: "Farm Tracer Platform",
    district: "Pune",
    state: "Maharashtra",
    address: "Headquarters",
    email: "admin@farmtracer.internal",
  },
  COLD_STORAGE: {
    id: "usr-coldstorage-01",
    name: "Gokul Chilling Center",
    role: "COLD_STORAGE",
    organization: "Gokul Milk Cold Chain Hub",
    district: "Kolhapur",
    state: "Maharashtra",
    address: "Karveer Chilling Plant, Kolhapur, MH",
    fssaiNumber: "FSSAI-11518012000456",
    email: "coldstorage@gokulmilk.coop",
  },
};

export default function App() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem("farm_tracer_active_user");
  });
  const [currentRole, setCurrentRole] = useState<UserRole>("FARMER");
  const [activeUser, setActiveUser] = useState<UserProfile>(DEMO_USERS["FARMER"]);
  const [language, setLanguage] = useState<SupportedLanguage>("EN");
  const [activeTab, setActiveTab] = useState<"LOGIN" | "HOME" | "DASHBOARD" | "TRACE">(() => {
    return localStorage.getItem("farm_tracer_active_user") ? "DASHBOARD" : "LOGIN";
  });
  const [selectedTraceBatchId, setSelectedTraceBatchId] = useState<string>("FT-IN-MH-PUN-20260810-9843A1");

  // Offline Simulation State
  const [isOffline, setIsOffline] = useState<boolean>(!navigator.onLine);
  const [pendingSyncCount, setPendingSyncCount] = useState<number>(0);

  // Modals
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isQrPrintModalOpen, setIsQrPrintModalOpen] = useState(false);
  const [printTargetBatch, setPrintTargetBatch] = useState<Batch | null>(null);

  // Database Collections
  const [batches, setBatches] = useState<Batch[]>([]);
  const [events, setEvents] = useState<SupplyChainEvent[]>([]);
  const [recalls, setRecalls] = useState<RecallNotice[]>([]);
  const [risks, setRisks] = useState<RiskAlert[]>([]);

  // PWA Install Prompt
  const [pwaDeferredPrompt, setPwaDeferredPrompt] = useState<any>(null);

  const reloadData = async () => {
    const allB = await getAllBatches();
    const allE = await getAllEvents();
    const allR = await getAllRecalls();
    const q = await getSyncQueue();

    setBatches(allB);
    setEvents(allE);
    setRecalls(allR);
    setPendingSyncCount(q.length);

    // Run spatial/temporal risk engine
    const detectedRisks = detectRisksAndAnomalies(allB, allE);
    setRisks(detectedRisks);
  };

  useEffect(() => {
    // Seed initial mock data into IndexedDB
    seedInitialMockData().then(() => {
      reloadData();
    });

    // Restore user session if saved
    const savedUser = localStorage.getItem("farm_tracer_active_user");
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed?.role) {
          setCurrentRole(parsed.role);
          setActiveUser(parsed);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.warn("Failed to parse saved user session:", e);
      }
    }

    // Handle online/offline network listeners
    const handleOnline = () => {
      setIsOffline(false);
      OfflineSyncManager.triggerSync().then(() => reloadData());
    };
    const handleOffline = () => {
      setIsOffline(true);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Handle PWA Install Prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setPwaDeferredPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleLoginSuccess = (role: UserRole, userProfile: UserProfile) => {
    setCurrentRole(role);
    setActiveUser(userProfile);
    setIsAuthenticated(true);
    setActiveTab("DASHBOARD");
    localStorage.setItem("farm_tracer_active_user", JSON.stringify(userProfile));
  };

  const handleLogout = () => {
    localStorage.removeItem("farm_tracer_active_user");
    localStorage.removeItem("farm_tracer_auth_token");
    setIsAuthenticated(false);
    setActiveTab("LOGIN");
  };

  const handleSelectRoleAndUser = (role: UserRole, userProfile: UserProfile) => {
    setCurrentRole(role);
    setActiveUser(userProfile);
    setIsAuthenticated(true);
    localStorage.setItem("farm_tracer_active_user", JSON.stringify(userProfile));
    setActiveTab("DASHBOARD");
  };

  const handleOpenPrintModalForBatch = (batch: Batch) => {
    setPrintTargetBatch(batch);
    setIsQrPrintModalOpen(true);
  };

  const handleToggleOfflineSimulation = () => {
    setIsOffline(!isOffline);
  };

  const handleScanResult = (batchId: string) => {
    setSelectedTraceBatchId(batchId);
    setActiveTab("TRACE");
    setIsScannerOpen(false);
  };

  const handleInstallPwa = async () => {
    if (pwaDeferredPrompt) {
      pwaDeferredPrompt.prompt();
      const choice = await pwaDeferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setPwaDeferredPrompt(null);
      }
    }
  };

  return (
    <>
      {/* 1. Unauthenticated Login Screen View */}
      {!isAuthenticated && activeTab === "LOGIN" && (
        <LoginPage
          onLoginSuccess={handleLoginSuccess}
          onOpenPublicScanner={() => setIsScannerOpen(true)}
          onNavigatePublicTrace={() => setActiveTab("TRACE")}
          language={language}
          onLanguageChange={setLanguage}
          demoUsers={DEMO_USERS}
        />
      )}

      {/* 2. Public Trace View (accessible both logged in and logged out) */}
      {activeTab === "TRACE" && (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
          <Navbar
            currentRole={currentRole}
            currentUser={isAuthenticated ? activeUser : undefined}
            onOpenLoginModal={() => {
              if (isAuthenticated) setIsLoginModalOpen(true);
              else setActiveTab("LOGIN");
            }}
            onRoleChange={(r) => {
              setCurrentRole(r);
              const demo = DEMO_USERS[r] || DEMO_USERS.FARMER;
              setActiveUser(demo);
              localStorage.setItem("farm_tracer_active_user", JSON.stringify(demo));
            }}
            language={language}
            onLanguageChange={setLanguage}
            isOffline={isOffline}
            onToggleOffline={handleToggleOfflineSimulation}
            pendingSyncCount={pendingSyncCount}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
            onOpenScanner={() => setIsScannerOpen(true)}
            onNavigateHome={() => {
              if (isAuthenticated) setActiveTab("DASHBOARD");
              else setActiveTab("LOGIN");
            }}
            canInstallPwa={!!pwaDeferredPrompt}
            onInstallPwa={handleInstallPwa}
          />
          <main className="flex-1 pb-20 md:pb-8">
            <PublicTracePage
              batchId={selectedTraceBatchId}
              onNavigateHome={() => {
                if (isAuthenticated) setActiveTab("DASHBOARD");
                else setActiveTab("LOGIN");
              }}
              onSelectBatch={(bId) => setSelectedTraceBatchId(bId)}
              onOpenPrintModal={(b) => handleOpenPrintModalForBatch(b)}
            />
          </main>
        </div>
      )}

      {/* 3. Public Landing Overview (if selected) */}
      {!isAuthenticated && activeTab === "HOME" && (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans flex flex-col">
          <Navbar
            currentRole={currentRole}
            currentUser={undefined}
            onOpenLoginModal={() => setActiveTab("LOGIN")}
            onRoleChange={(r) => {
              setCurrentRole(r);
            }}
            language={language}
            onLanguageChange={setLanguage}
            isOffline={isOffline}
            onToggleOffline={handleToggleOfflineSimulation}
            pendingSyncCount={pendingSyncCount}
            onOpenSyncModal={() => setIsSyncModalOpen(true)}
            onOpenScanner={() => setIsScannerOpen(true)}
            onNavigateHome={() => setActiveTab("LOGIN")}
            canInstallPwa={!!pwaDeferredPrompt}
            onInstallPwa={handleInstallPwa}
          />
          <main className="flex-1 pb-20 md:pb-8">
            <LandingPage
              onOpenScanner={() => setIsScannerOpen(true)}
              onExploreDemo={() => setActiveTab("LOGIN")}
              language={language}
            />
          </main>
        </div>
      )}

      {/* 4. Authenticated Protected Application Shell */}
      {isAuthenticated && activeTab === "DASHBOARD" && (
        <ProtectedShell
          currentRole={currentRole}
          currentUser={activeUser}
          language={language}
          onLanguageChange={setLanguage}
          onLogout={handleLogout}
          onRoleChange={(r) => {
            setCurrentRole(r);
            const demo = DEMO_USERS[r] || DEMO_USERS.FARMER;
            setActiveUser(demo);
            localStorage.setItem("farm_tracer_active_user", JSON.stringify(demo));
          }}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
          onOpenScanner={() => setIsScannerOpen(true)}
          onOpenSyncModal={() => setIsSyncModalOpen(true)}
          onNavigateHome={() => setActiveTab("DASHBOARD")}
          onNavigateTrace={(bId) => {
            if (bId) setSelectedTraceBatchId(bId);
            setActiveTab("TRACE");
          }}
          isOffline={isOffline}
          onToggleOffline={handleToggleOfflineSimulation}
          pendingSyncCount={pendingSyncCount}
          canInstallPwa={!!pwaDeferredPrompt}
          onInstallPwa={handleInstallPwa}
        >
          {/* Active Role Dashboard Content */}
          {currentRole === "FARMER" && (
            <FarmerDashboard
              user={activeUser}
              batches={batches}
              onRefreshData={reloadData}
              onSelectBatch={(bId) => {
                setSelectedTraceBatchId(bId);
                setActiveTab("TRACE");
              }}
              onOpenPrintModal={handleOpenPrintModalForBatch}
            />
          )}

          {currentRole === "PROCESSOR" && (
            <ProcessorDashboard
              user={activeUser}
              batches={batches}
              onRefreshData={reloadData}
              onSelectBatch={(bId) => {
                setSelectedTraceBatchId(bId);
                setActiveTab("TRACE");
              }}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenPrintModal={handleOpenPrintModalForBatch}
            />
          )}

          {(currentRole === "DISTRIBUTOR" ||
            currentRole === "WAREHOUSE" ||
            currentRole === "TRANSPORTER" ||
            currentRole === "COLD_STORAGE") && (
            <DistributorDashboard
              user={activeUser}
              batches={batches}
              onRefreshData={reloadData}
              onSelectBatch={(bId) => {
                setSelectedTraceBatchId(bId);
                setActiveTab("TRACE");
              }}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenPrintModal={handleOpenPrintModalForBatch}
            />
          )}

          {currentRole === "RETAILER" && (
            <RetailerDashboard
              user={activeUser}
              batches={batches}
              onRefreshData={reloadData}
              onSelectBatch={(bId) => {
                setSelectedTraceBatchId(bId);
                setActiveTab("TRACE");
              }}
              onOpenScanner={() => setIsScannerOpen(true)}
              onOpenPrintModal={handleOpenPrintModalForBatch}
            />
          )}

          {currentRole === "CONSUMER" && (
            <PublicTracePage
              batchId={selectedTraceBatchId}
              onNavigateHome={() => setActiveTab("DASHBOARD")}
              onSelectBatch={(bId) => setSelectedTraceBatchId(bId)}
              onOpenPrintModal={(b) => handleOpenPrintModalForBatch(b)}
            />
          )}

          {currentRole === "AUTHORITY" && (
            <AuthorityDashboard
              batches={batches}
              recalls={recalls}
              risks={risks}
              events={events}
              onRefreshData={reloadData}
              onSelectBatch={(bId) => {
                setSelectedTraceBatchId(bId);
                setActiveTab("TRACE");
              }}
              onOpenPrintModal={handleOpenPrintModalForBatch}
            />
          )}

          {currentRole === "ADMIN" && (
            <AdminDashboard
              batches={batches}
              events={events}
              pendingSyncCount={pendingSyncCount}
              onRefreshData={reloadData}
            />
          )}
        </ProtectedShell>
      )}

      {/* Login & Role Selection Window Modal (for quick role switching within authenticated session) */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        currentRole={currentRole}
        currentUser={activeUser}
        onSelectRoleAndUser={handleSelectRoleAndUser}
        demoUsers={DEMO_USERS}
      />

      {/* Printable QR Code & Label Modal */}
      <QRPrintModal
        isOpen={isQrPrintModalOpen}
        onClose={() => setIsQrPrintModalOpen(false)}
        batch={printTargetBatch}
      />

      {/* Camera QR Scanner Modal */}
      <QRScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        onScanResult={handleScanResult}
      />

      {/* Offline Sync Queue Modal */}
      <OfflineSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        isOffline={isOffline}
        onToggleOffline={handleToggleOfflineSimulation}
      />
    </>
  );
}
