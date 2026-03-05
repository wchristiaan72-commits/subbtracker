import React, { useState, useEffect } from 'react';
import { 
  Home, 
  PieChart, 
  Settings, 
  Plus, 
  Bell, 
  ChevronRight, 
  Search,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  ExternalLink,
  Trash2,
  Moon,
  Sun,
  Globe,
  DollarSign
} from 'lucide-react';

export interface Subscription {
  id: string;
  name: string;
  cost: number;
  currency: string;
  billingCycle: 'monthly' | 'yearly';
  nextPaymentDate: string;
  logo: string;
  category: string;
  cancelUrl?: string;
  instructions?: string;
}

export const PREDEFINED_SERVICES = [
  { name: 'Netflix', category: 'Streaming', logo: 'N', cancelUrl: 'https://www.netflix.com/CancelPlan', instructions: 'Log in, go to Account, click Cancel Membership.', defaultCost: 15.49 },
  { name: 'Spotify', category: 'Music', logo: 'S', cancelUrl: 'https://www.spotify.com/account/cancel/', instructions: 'Go to your account page, scroll to Your Plan, click Change Plan, scroll to Cancel Premium.', defaultCost: 10.99 },
  { name: 'Amazon Prime', category: 'Streaming', logo: 'A', cancelUrl: 'https://www.amazon.com/mc', instructions: 'Go to Manage Prime Membership, click End Membership and Benefits.', defaultCost: 14.99 },
  { name: 'Adobe Creative Cloud', category: 'Software', logo: 'A', cancelUrl: 'https://account.adobe.com/plans', instructions: 'Log in, go to Plans, click Manage Plan, select Cancel your plan.', defaultCost: 54.99 },
  { name: 'ChatGPT Plus', category: 'AI Tools', logo: 'O', cancelUrl: 'https://chat.openai.com/#settings/billing', instructions: 'Click your profile, select My Plan, click Manage my subscription, then Cancel Plan.', defaultCost: 20.00 },
];

const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    home: 'Home',
    settings: 'Settings',
    mySubscriptions: 'My Subscriptions',
    active: 'active',
    totalMonthlySpend: 'Total Monthly Spend',
    upcomingPayments: 'Upcoming Payments',
    noSubscriptions: 'No subscriptions added yet.',
    due: 'Due',
    addSubscription: 'Add Subscription',
    searchService: 'Search for a service...',
    popularServices: 'Popular Services',
    customSubscription: 'Custom Subscription',
    cancel: 'Cancel',
    planCost: 'Plan Cost',
    nextPayment: 'Next Payment',
    status: 'Status',
    activeStatus: 'Active',
    cancelSubscription: 'Cancel Subscription',
    deepLink: 'Deep Link Cancellation',
    manualInstructions: 'Manual Instructions',
    openCancelPage: 'Open Cancellation Page',
    iveCancelled: "I've Cancelled It (Remove from Tracker)",
    account: 'Account',
    upgradePlan: 'Upgrade Plan',
    logOut: 'Log Out',
    preferences: 'Preferences',
    appearance: 'Appearance',
    language: 'Language',
    currency: 'Currency',
    light: 'Light',
    dark: 'Dark',
    proPlan: 'Pro Plan',
    premiumPlan: 'Premium Plan',
    unlimitedSubs: 'Unlimited subscriptions',
    advancedReminders: 'Advanced reminders',
    analytics: 'Analytics',
    everythingInPro: 'Everything in Pro',
    cancelAutomation: 'Cancel automation',
    priorityNotifications: 'Priority notifications',
    payWithYoco: 'Pay with Yoco',
    processing: 'Processing...',
    popular: 'Popular',
  },
  es: {
    home: 'Inicio',
    settings: 'Ajustes',
    mySubscriptions: 'Mis Suscripciones',
    active: 'activas',
    totalMonthlySpend: 'Gasto Mensual Total',
    upcomingPayments: 'Próximos Pagos',
    noSubscriptions: 'Aún no hay suscripciones.',
    due: 'Vence',
    addSubscription: 'Añadir Suscripción',
    searchService: 'Buscar un servicio...',
    popularServices: 'Servicios Populares',
    customSubscription: 'Suscripción Personalizada',
    cancel: 'Cancelar',
    planCost: 'Costo del Plan',
    nextPayment: 'Próximo Pago',
    status: 'Estado',
    activeStatus: 'Activo',
    cancelSubscription: 'Cancelar Suscripción',
    deepLink: 'Cancelación con Enlace Directo',
    manualInstructions: 'Instrucciones Manuales',
    openCancelPage: 'Abrir Página de Cancelación',
    iveCancelled: "Lo he cancelado (Eliminar del rastreador)",
    account: 'Cuenta',
    upgradePlan: 'Mejorar Plan',
    logOut: 'Cerrar Sesión',
    preferences: 'Preferencias',
    appearance: 'Apariencia',
    language: 'Idioma',
    currency: 'Moneda',
    light: 'Claro',
    dark: 'Oscuro',
    proPlan: 'Plan Pro',
    premiumPlan: 'Plan Premium',
    unlimitedSubs: 'Suscripciones ilimitadas',
    advancedReminders: 'Recordatorios avanzados',
    analytics: 'Analítica',
    everythingInPro: 'Todo lo de Pro',
    cancelAutomation: 'Automatización de cancelación',
    priorityNotifications: 'Notificaciones prioritarias',
    payWithYoco: 'Pagar con Yoco',
    processing: 'Procesando...',
    popular: 'Popular',
  },
  fr: {
    home: 'Accueil',
    settings: 'Paramètres',
    mySubscriptions: 'Mes Abonnements',
    active: 'actifs',
    totalMonthlySpend: 'Dépenses Mensuelles Totales',
    upcomingPayments: 'Prochains Paiements',
    noSubscriptions: 'Aucun abonnement ajouté.',
    due: 'Dû le',
    addSubscription: 'Ajouter un Abonnement',
    searchService: 'Rechercher un service...',
    popularServices: 'Services Populaires',
    customSubscription: 'Abonnement Personnalisé',
    cancel: 'Annuler',
    planCost: 'Coût du Forfait',
    nextPayment: 'Prochain Paiement',
    status: 'Statut',
    activeStatus: 'Actif',
    cancelSubscription: 'Annuler l\'Abonnement',
    deepLink: 'Annulation par Lien Direct',
    manualInstructions: 'Instructions Manuelles',
    openCancelPage: 'Ouvrir la Page d\'Annulation',
    iveCancelled: "Je l'ai annulé (Retirer du suivi)",
    account: 'Compte',
    upgradePlan: 'Améliorer le Forfait',
    logOut: 'Se Déconnecter',
    preferences: 'Préférences',
    appearance: 'Apparence',
    language: 'Langue',
    currency: 'Devise',
    light: 'Clair',
    dark: 'Sombre',
    proPlan: 'Forfait Pro',
    premiumPlan: 'Forfait Premium',
    unlimitedSubs: 'Abonnements illimités',
    advancedReminders: 'Rappels avancés',
    analytics: 'Analytique',
    everythingInPro: 'Tout de Pro',
    cancelAutomation: 'Automatisation de l\'annulation',
    priorityNotifications: 'Notifications prioritaires',
    payWithYoco: 'Payer avec Yoco',
    processing: 'Traitement...',
    popular: 'Populaire',
  },
  de: {
    home: 'Startseite',
    settings: 'Einstellungen',
    mySubscriptions: 'Meine Abonnements',
    active: 'aktiv',
    totalMonthlySpend: 'Monatliche Gesamtausgaben',
    upcomingPayments: 'Anstehende Zahlungen',
    noSubscriptions: 'Noch keine Abonnements hinzugefügt.',
    due: 'Fällig am',
    addSubscription: 'Abonnement Hinzufügen',
    searchService: 'Nach einem Dienst suchen...',
    popularServices: 'Beliebte Dienste',
    customSubscription: 'Benutzerdefiniertes Abonnement',
    cancel: 'Abbrechen',
    planCost: 'Plankosten',
    nextPayment: 'Nächste Zahlung',
    status: 'Status',
    activeStatus: 'Aktiv',
    cancelSubscription: 'Abonnement Kündigen',
    deepLink: 'Deep-Link-Kündigung',
    manualInstructions: 'Manuelle Anleitung',
    openCancelPage: 'Kündigungsseite Öffnen',
    iveCancelled: "Ich habe es gekündigt (Aus Tracker entfernen)",
    account: 'Konto',
    upgradePlan: 'Plan Aktualisieren',
    logOut: 'Abmelden',
    preferences: 'Präferenzen',
    appearance: 'Erscheinungsbild',
    language: 'Sprache',
    currency: 'Währung',
    light: 'Hell',
    dark: 'Dunkel',
    proPlan: 'Pro-Plan',
    premiumPlan: 'Premium-Plan',
    unlimitedSubs: 'Unbegrenzte Abonnements',
    advancedReminders: 'Erweiterte Erinnerungen',
    analytics: 'Analytik',
    everythingInPro: 'Alles in Pro',
    cancelAutomation: 'Kündigungsautomatisierung',
    priorityNotifications: 'Prioritätsbenachrichtigungen',
    payWithYoco: 'Mit Yoco bezahlen',
    processing: 'Wird bearbeitet...',
    popular: 'Beliebt',
  }
};

export function UserApp() {
  const [activeScreen, setActiveScreen] = useState('dashboard');
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [subscriptions, setSubscriptions] = useState<Subscription[]>(() => {
    const saved = localStorage.getItem('subtrack_subscriptions');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return [];
      }
    }
    return [
      {
        id: '1',
        name: 'Netflix',
        cost: 15.49,
        currency: '$',
        billingCycle: 'monthly',
        nextPaymentDate: '2026-03-15',
        logo: 'N',
        category: 'Streaming',
        cancelUrl: 'https://www.netflix.com/CancelPlan',
        instructions: 'Log in, go to Account, click Cancel Membership.'
      }
    ];
  });

  const [userPlan, setUserPlan] = useState(() => {
    return localStorage.getItem('subtrack_plan') || 'Free';
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('subtrack_theme') as 'dark' | 'light') || 'dark';
  });
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('subtrack_language') || 'en';
  });
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('subtrack_currency') || 'USD';
  });

  useEffect(() => {
    localStorage.setItem('subtrack_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('subtrack_language', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('subtrack_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('subtrack_subscriptions', JSON.stringify(subscriptions));
  }, [subscriptions]);

  useEffect(() => {
    localStorage.setItem('subtrack_plan', userPlan);
  }, [userPlan]);

  const addSubscription = (sub: Omit<Subscription, 'id'>) => {
    const newSub = { ...sub, id: Math.random().toString(36).substr(2, 9) };
    setSubscriptions([...subscriptions, newSub]);
    setActiveScreen('dashboard');
  };

  const removeSubscription = (id: string) => {
    setSubscriptions(subscriptions.filter(s => s.id !== id));
    setActiveScreen('dashboard');
  };

  const t = (key: string) => {
    return TRANSLATIONS[language]?.[key] || TRANSLATIONS['en'][key] || key;
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'dashboard':
        return <DashboardScreen 
          subscriptions={subscriptions} 
          onNavigate={setActiveScreen} 
          onSelectSub={(sub) => { setSelectedSub(sub); setActiveScreen('details'); }} 
          currency={currency}
          t={t}
        />;
      case 'add':
        return <AddSubscriptionScreen onAdd={addSubscription} onNavigate={setActiveScreen} currency={currency} t={t} />;
      case 'details':
        return <SubscriptionDetailsScreen 
          sub={selectedSub} 
          onNavigate={setActiveScreen} 
          onRemove={removeSubscription}
          currency={currency}
          t={t}
        />;
      case 'cancel':
        return <CancelScreen sub={selectedSub} onNavigate={setActiveScreen} onRemove={removeSubscription} currency={currency} t={t} />;
      case 'settings':
        return <SettingsScreen 
          userPlan={userPlan} 
          onNavigate={(screen) => {
            if (screen === 'logout') {
              localStorage.removeItem('subtrack_token');
              window.location.reload();
            } else {
              setActiveScreen(screen);
            }
          }} 
          theme={theme} setTheme={setTheme}
          language={language} setLanguage={setLanguage}
          currency={currency} setCurrency={setCurrency}
          t={t}
        />;
      case 'upgrade':
        return <UpgradeScreen onNavigate={setActiveScreen} onUpgrade={(plan) => { setUserPlan(plan); setActiveScreen('settings'); }} currency={currency} t={t} />;
      default:
        return <DashboardScreen subscriptions={subscriptions} onNavigate={setActiveScreen} onSelectSub={() => {}} currency={currency} t={t} />;
    }
  };

  return (
    <div className={`flex items-center justify-center h-full w-full ${theme === 'dark' ? 'bg-[#0a0a0c]' : 'bg-neutral-100'}`}>
      <div className={`w-full max-w-md h-full sm:border sm:rounded-[3rem] overflow-hidden relative shadow-2xl flex flex-col ${theme === 'dark' ? 'bg-black sm:border-neutral-800' : 'bg-white sm:border-neutral-200'}`}>
        {renderScreen()}
        
        {/* Bottom Navigation */}
        {(activeScreen === 'dashboard' || activeScreen === 'settings') && (
          <div className={`absolute bottom-0 left-0 right-0 h-20 backdrop-blur-lg border-t flex items-center justify-around px-6 pb-4 ${theme === 'dark' ? 'bg-[#0a0a0c]/90 border-neutral-800' : 'bg-white/90 border-neutral-200'}`}>
            <button onClick={() => setActiveScreen('dashboard')} className={`flex flex-col items-center gap-1 ${activeScreen === 'dashboard' ? 'text-indigo-500' : 'text-neutral-500'}`}>
              <Home size={24} />
              <span className="text-[10px] font-medium">{t('home')}</span>
            </button>
            <button onClick={() => setActiveScreen('add')} className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center -mt-8 shadow-lg shadow-indigo-500/30">
              <Plus size={24} />
            </button>
            <button onClick={() => setActiveScreen('settings')} className={`flex flex-col items-center gap-1 ${activeScreen === 'settings' ? 'text-indigo-500' : 'text-neutral-500'}`}>
              <Settings size={24} />
              <span className="text-[10px] font-medium">{t('settings')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function DashboardScreen({ subscriptions, onNavigate, onSelectSub, currency, t }: { subscriptions: Subscription[], onNavigate: (s: string) => void, onSelectSub: (s: Subscription) => void, currency: string, t: (k: string) => string }) {
  const totalMonthly = subscriptions.reduce((acc, sub) => {
    return acc + (sub.billingCycle === 'monthly' ? sub.cost : sub.cost / 12);
  }, 0);

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : 'R';

  return (
    <div className="p-6 pt-14 h-full overflow-y-auto no-scrollbar pb-24">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold dark:text-white text-neutral-900">{t('mySubscriptions')}</h1>
          <p className="text-neutral-500 text-sm">{subscriptions.length} {t('active')}</p>
        </div>
        <button className="w-10 h-10 rounded-full dark:bg-neutral-900 bg-neutral-100 flex items-center justify-center text-neutral-500">
          <Bell size={20} />
        </button>
      </div>

      <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 mb-8 text-white shadow-lg shadow-indigo-500/20">
        <p className="text-indigo-100 text-sm font-medium mb-1">{t('totalMonthlySpend')}</p>
        <h2 className="text-4xl font-bold mb-4">{currencySymbol}{totalMonthly.toFixed(2)}</h2>
        <div className="flex items-center gap-2 text-sm bg-black/20 w-fit px-3 py-1.5 rounded-full backdrop-blur-sm">
          <AlertCircle size={14} />
          <span>2 payments due this week</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold dark:text-white text-neutral-900 mb-4">{t('upcomingPayments')}</h3>
        {subscriptions.length === 0 ? (
          <div className="text-center py-10 text-neutral-500">
            {t('noSubscriptions')}
          </div>
        ) : (
          subscriptions.sort((a, b) => new Date(a.nextPaymentDate).getTime() - new Date(b.nextPaymentDate).getTime()).map((sub) => (
            <div 
              key={sub.id}
              onClick={() => onSelectSub(sub)}
              className="dark:bg-[#121214] bg-white border dark:border-neutral-800 border-neutral-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer active:scale-95 transition-transform shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl dark:bg-neutral-800 bg-neutral-100 flex items-center justify-center text-xl font-bold dark:text-white text-neutral-900">
                  {sub.logo}
                </div>
                <div>
                  <h4 className="font-bold dark:text-white text-neutral-900">{sub.name}</h4>
                  <p className="text-xs text-neutral-500">{t('due')} {new Date(sub.nextPaymentDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold dark:text-white text-neutral-900">{currencySymbol}{sub.cost.toFixed(2)}</p>
                <p className="text-xs text-neutral-500">/{sub.billingCycle === 'monthly' ? 'mo' : 'yr'}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function AddSubscriptionScreen({ onAdd, onNavigate, currency, t }: { onAdd: (s: Omit<Subscription, 'id'>) => void, onNavigate: (s: string) => void, currency: string, t: (k: string) => string }) {
  const [search, setSearch] = useState('');
  const [selectedService, setSelectedService] = useState<any>(null);
  const [cost, setCost] = useState('');
  const [nextPaymentDate, setNextPaymentDate] = useState('');

  const filtered = PREDEFINED_SERVICES.filter(s => s.name.toLowerCase().includes(search.toLowerCase()));
  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : 'R';

  const handleAdd = () => {
    if (!selectedService || !cost || !nextPaymentDate) return;
    onAdd({
      name: selectedService.name,
      cost: parseFloat(cost),
      currency: currencySymbol,
      billingCycle: 'monthly',
      nextPaymentDate,
      logo: selectedService.logo,
      category: selectedService.category,
      cancelUrl: selectedService.cancelUrl,
      instructions: selectedService.instructions
    });
  };

  if (selectedService) {
    return (
      <div className="p-6 pt-14 h-full flex flex-col">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setSelectedService(null)} className="w-10 h-10 rounded-full dark:bg-neutral-900 bg-neutral-100 flex items-center justify-center dark:text-white text-neutral-900">
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold dark:text-white text-neutral-900">Add {selectedService.name}</h1>
        </div>

        <div className="space-y-6 flex-1">
          <div>
            <label className="block text-sm font-medium text-neutral-500 mb-2">Monthly Cost ({currencySymbol})</label>
            <input 
              type="number" 
              value={cost} 
              onChange={(e) => setCost(e.target.value)}
              placeholder={selectedService.defaultCost.toString()}
              className="w-full dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 rounded-xl p-4 dark:text-white text-neutral-900 focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-500 mb-2">Next Payment Date</label>
            <input 
              type="date" 
              value={nextPaymentDate}
              onChange={(e) => setNextPaymentDate(e.target.value)}
              className="w-full dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 rounded-xl p-4 dark:text-white text-neutral-900 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <button 
          onClick={handleAdd}
          disabled={!cost || !nextPaymentDate}
          className="w-full py-4 rounded-xl bg-indigo-500 text-white font-bold disabled:opacity-50 mt-auto"
        >
          {t('addSubscription')}
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 pt-14 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => onNavigate('dashboard')} className="w-10 h-10 rounded-full dark:bg-neutral-900 bg-neutral-100 flex items-center justify-center dark:text-white text-neutral-900">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold dark:text-white text-neutral-900">{t('addSubscription')}</h1>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
        <input 
          type="text" 
          placeholder={t('searchService')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full dark:bg-neutral-900 bg-neutral-100 border dark:border-neutral-800 border-neutral-200 rounded-2xl py-4 pl-12 pr-4 dark:text-white text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-indigo-500"
        />
      </div>

      <div className="flex-1 overflow-y-auto no-scrollbar space-y-3">
        {filtered.map((service, idx) => (
          <div 
            key={idx} 
            onClick={() => {
              setSelectedService(service);
              setCost(service.defaultCost.toString());
            }}
            className="dark:bg-[#121214] bg-white border dark:border-neutral-800 border-neutral-200 rounded-2xl p-4 flex items-center gap-4 cursor-pointer dark:hover:bg-neutral-800 hover:bg-neutral-50 transition-colors shadow-sm"
          >
            <div className="w-12 h-12 rounded-xl dark:bg-neutral-800 bg-neutral-100 flex items-center justify-center text-xl font-bold dark:text-white text-neutral-900">
              {service.logo}
            </div>
            <div>
              <h4 className="font-bold dark:text-white text-neutral-900">{service.name}</h4>
              <p className="text-xs text-neutral-500">{service.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SubscriptionDetailsScreen({ sub, onNavigate, onRemove, currency, t }: { sub: Subscription | null, onNavigate: (s: string) => void, onRemove: (id: string) => void, currency: string, t: (k: string) => string }) {
  if (!sub) return null;

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : 'R';

  return (
    <div className="p-6 pt-14 h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <button onClick={() => onNavigate('dashboard')} className="w-10 h-10 rounded-full dark:bg-neutral-900 bg-neutral-100 flex items-center justify-center dark:text-white text-neutral-900">
          <ArrowLeft size={20} />
        </button>
        <button onClick={() => onRemove(sub.id)} className="w-10 h-10 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center">
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex flex-col items-center mb-8">
        <div className="w-24 h-24 rounded-3xl dark:bg-neutral-800 bg-neutral-100 flex items-center justify-center text-4xl font-bold dark:text-white text-neutral-900 mb-4 shadow-xl">
          {sub.logo}
        </div>
        <h1 className="text-3xl font-bold dark:text-white text-neutral-900 mb-1">{sub.name}</h1>
        <p className="text-neutral-500">{sub.category}</p>
      </div>

      <div className="dark:bg-[#121214] bg-white border dark:border-neutral-800 border-neutral-200 rounded-3xl p-6 mb-8 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <span className="text-neutral-500">{t('planCost')}</span>
          <span className="text-xl font-bold dark:text-white text-neutral-900">{currencySymbol}{sub.cost.toFixed(2)}<span className="text-sm text-neutral-500 font-normal">/{sub.billingCycle === 'monthly' ? 'mo' : 'yr'}</span></span>
        </div>
        <div className="flex justify-between items-center mb-6">
          <span className="text-neutral-500">{t('nextPayment')}</span>
          <span className="dark:text-white text-neutral-900 font-medium">{new Date(sub.nextPaymentDate).toLocaleDateString()}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-neutral-500">{t('status')}</span>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-500 text-xs font-bold uppercase tracking-wider">{t('activeStatus')}</span>
        </div>
      </div>

      <div className="mt-auto space-y-3">
        <button 
          onClick={() => onNavigate('cancel')}
          className="w-full py-4 rounded-xl bg-red-500/10 text-red-500 font-bold border border-red-500/20"
        >
          {t('cancelSubscription')}
        </button>
      </div>
    </div>
  );
}

function CancelScreen({ sub, onNavigate, onRemove, currency, t }: { sub: Subscription | null, onNavigate: (s: string) => void, onRemove: (id: string) => void, currency: string, t: (k: string) => string }) {
  if (!sub) return null;

  return (
    <div className="p-6 pt-14 h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => onNavigate('details')} className="w-10 h-10 rounded-full dark:bg-neutral-900 bg-neutral-100 flex items-center justify-center dark:text-white text-neutral-900">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold dark:text-white text-neutral-900">{t('cancel')} {sub.name}</h1>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-8 flex items-start gap-3">
        <AlertCircle className="text-amber-500 shrink-0 mt-0.5" size={20} />
        <p className="text-sm text-amber-600 dark:text-amber-500/90 leading-relaxed">
          Cancelling will stop future payments. You will still have access until the end of your current billing cycle ({new Date(sub.nextPaymentDate).toLocaleDateString()}).
        </p>
      </div>

      <div className="space-y-6">
        {sub.cancelUrl && (
          <div className="dark:bg-[#121214] bg-white border dark:border-neutral-800 border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold dark:text-white text-neutral-900 mb-2 flex items-center gap-2">
              <ExternalLink size={18} className="text-blue-500" /> {t('deepLink')}
            </h3>
            <p className="text-sm text-neutral-500 mb-4">
              We found the direct cancellation page for {sub.name}. Tap below to open it in your browser.
            </p>
            <a 
              href={sub.cancelUrl} 
              target="_blank" 
              rel="noreferrer"
              className="w-full py-3 rounded-xl bg-blue-500 text-white font-bold flex items-center justify-center gap-2"
            >
              {t('openCancelPage')}
            </a>
          </div>
        )}

        {sub.instructions && (
          <div className="dark:bg-[#121214] bg-white border dark:border-neutral-800 border-neutral-200 rounded-2xl p-6 shadow-sm">
            <h3 className="font-bold dark:text-white text-neutral-900 mb-2">{t('manualInstructions')}</h3>
            <p className="text-sm text-neutral-500 leading-relaxed">
              {sub.instructions}
            </p>
          </div>
        )}
      </div>

      <div className="mt-auto pt-6">
        <button 
          onClick={() => {
            onRemove(sub.id);
            alert(`${sub.name} has been removed from your tracker.`);
          }}
          className="w-full py-4 rounded-xl dark:bg-neutral-800 bg-neutral-200 dark:text-white text-neutral-900 font-bold"
        >
          {t('iveCancelled')}
        </button>
      </div>
    </div>
  );
}

function SettingsScreen({ 
  userPlan, 
  onNavigate,
  theme,
  setTheme,
  language,
  setLanguage,
  currency,
  setCurrency,
  t
}: { 
  userPlan: string, 
  onNavigate: (s: string) => void,
  theme: 'dark' | 'light',
  setTheme: (t: 'dark' | 'light') => void,
  language: string,
  setLanguage: (l: string) => void,
  currency: string,
  setCurrency: (c: string) => void,
  t: (key: string) => string
}) {
  return (
    <div className="p-6 pt-14 h-full flex flex-col pb-24 overflow-y-auto no-scrollbar">
      <h1 className="text-2xl font-bold dark:text-white text-neutral-900 mb-8">{t('settings')}</h1>

      <div className="space-y-8">
        {/* Profile */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-indigo-500 flex items-center justify-center text-xl font-bold text-white">
            JD
          </div>
          <div>
            <h3 className="font-bold dark:text-white text-neutral-900 text-lg">John Doe</h3>
            <p className="text-neutral-500">john@example.com</p>
            <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-500">
              {userPlan} Plan
            </span>
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t('preferences')}</h4>
          <div className="dark:bg-[#121214] bg-white border dark:border-neutral-800 border-neutral-200 rounded-2xl overflow-hidden">
            
            {/* Theme Toggle */}
            <div className="flex justify-between items-center p-4 border-b dark:border-neutral-800 border-neutral-200">
              <div className="flex items-center gap-3">
                {theme === 'dark' ? <Moon size={18} className="text-indigo-500" /> : <Sun size={18} className="text-indigo-500" />}
                <span className="dark:text-white text-neutral-900">{t('appearance')}</span>
              </div>
              <div className="flex bg-neutral-100 dark:bg-neutral-900 rounded-lg p-1">
                <button 
                  onClick={() => setTheme('light')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${theme === 'light' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}
                >
                  {t('light')}
                </button>
                <button 
                  onClick={() => setTheme('dark')}
                  className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${theme === 'dark' ? 'bg-neutral-800 text-white shadow-sm' : 'text-neutral-500 hover:text-neutral-300'}`}
                >
                  {t('dark')}
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div className="flex justify-between items-center p-4 border-b dark:border-neutral-800 border-neutral-200">
              <div className="flex items-center gap-3">
                <Globe size={18} className="text-indigo-500" />
                <span className="dark:text-white text-neutral-900">{t('language')}</span>
              </div>
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-transparent text-sm font-medium dark:text-neutral-400 text-neutral-600 focus:outline-none cursor-pointer"
              >
                <option value="en">English (US)</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
                <option value="de">Deutsch</option>
              </select>
            </div>

            {/* Currency Selection */}
            <div className="flex justify-between items-center p-4">
              <div className="flex items-center gap-3">
                <DollarSign size={18} className="text-indigo-500" />
                <span className="dark:text-white text-neutral-900">{t('currency')}</span>
              </div>
              <select 
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="bg-transparent text-sm font-medium dark:text-neutral-400 text-neutral-600 focus:outline-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="ZAR">ZAR (R)</option>
              </select>
            </div>

          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-3">{t('account')}</h4>
          <div className="dark:bg-[#121214] bg-white border dark:border-neutral-800 border-neutral-200 rounded-2xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b dark:border-neutral-800 border-neutral-200 cursor-pointer dark:hover:bg-neutral-800/50 hover:bg-neutral-50" onClick={() => onNavigate('upgrade')}>
              <span className="dark:text-white text-neutral-900">{t('upgradePlan')}</span>
              <ChevronRight size={16} className="text-neutral-400"/>
            </div>
            <div className="flex justify-between items-center p-4 cursor-pointer dark:hover:bg-neutral-800/50 hover:bg-neutral-50" onClick={() => onNavigate('logout')}>
              <span className="text-red-500">{t('logOut')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function UpgradeScreen({ onNavigate, onUpgrade, currency, t }: { onNavigate: (s: string) => void, onUpgrade: (plan: string) => void, currency: string, t: (k: string) => string }) {
  const [loading, setLoading] = useState(false);

  const currencySymbol = currency === 'USD' ? '$' : currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : 'R';
  const multiplier = currency === 'ZAR' ? 18 : currency === 'EUR' ? 0.9 : currency === 'GBP' ? 0.8 : 1;
  const proPrice = Math.round(7 * multiplier);
  const premiumPrice = Math.round(15 * multiplier);

  const handleYocoPayment = (planName: string, amountInCents: number) => {
    setLoading(true);
    
    if (!document.getElementById('yoco-sdk')) {
      const script = document.createElement('script');
      script.id = 'yoco-sdk';
      script.src = 'https://js.yoco.com/sdk/v1/yoco-sdk-web.js';
      script.onload = () => initYoco(planName, amountInCents);
      document.body.appendChild(script);
    } else {
      initYoco(planName, amountInCents);
    }
  };

  const initYoco = (planName: string, amountInCents: number) => {
    // @ts-ignore
    const yoco = new window.YocoSDK({
      publicKey: 'pk_test_ed3c54a6gOol69qa7f45' // Test key
    });

    yoco.showPopup({
      amountInCents: amountInCents,
      currency: currency === 'ZAR' ? 'ZAR' : 'USD', // Yoco primarily supports ZAR, but we can pass USD for testing if needed
      name: 'SubTrack',
      description: planName,
      callback: function (result: any) {
        setLoading(false);
        if (result.error) {
          alert("Payment failed: " + result.error.message);
        } else {
          alert("Payment successful! Token: " + result.id);
          onUpgrade(planName);
        }
      }
    });
  };

  return (
    <div className="p-6 pt-14 h-full flex flex-col overflow-y-auto no-scrollbar">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => onNavigate('settings')} className="w-10 h-10 rounded-full dark:bg-neutral-900 bg-neutral-100 flex items-center justify-center dark:text-white text-neutral-900">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold dark:text-white text-neutral-900">{t('upgradePlan')}</h1>
      </div>

      <div className="space-y-4 mb-auto pb-6">
        {/* Pro Plan */}
        <div className="dark:bg-[#121214] bg-white border dark:border-neutral-800 border-neutral-200 rounded-2xl p-6 shadow-sm">
          <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-2">{t('proPlan')}</h3>
          <p className="text-3xl font-bold text-indigo-500 mb-4">{currencySymbol}{proPrice}<span className="text-sm text-neutral-500">/{t('mo') || 'mo'}</span></p>
          <ul className="space-y-2 mb-6 text-sm dark:text-neutral-300 text-neutral-600">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-indigo-500"/> {t('unlimitedSubs')}</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-indigo-500"/> {t('advancedReminders')}</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-indigo-500"/> {t('analytics')}</li>
          </ul>
          <button 
            onClick={() => handleYocoPayment('Pro', proPrice * 100)}
            className="w-full py-3 rounded-xl bg-indigo-500 text-white font-bold"
            disabled={loading}
          >
            {loading ? t('processing') : t('payWithYoco')}
          </button>
        </div>

        {/* Premium Plan */}
        <div className="bg-gradient-to-br dark:from-indigo-900/40 dark:to-purple-900/40 from-indigo-50 to-purple-50 border dark:border-indigo-500/30 border-indigo-200 rounded-2xl p-6 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">{t('popular')}</div>
          <h3 className="text-xl font-bold dark:text-white text-neutral-900 mb-2">{t('premiumPlan')}</h3>
          <p className="text-3xl font-bold text-purple-500 mb-4">{currencySymbol}{premiumPrice}<span className="text-sm text-neutral-500">/{t('mo') || 'mo'}</span></p>
          <ul className="space-y-2 mb-6 text-sm dark:text-neutral-300 text-neutral-600">
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500"/> {t('everythingInPro')}</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500"/> {t('cancelAutomation')}</li>
            <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-purple-500"/> {t('priorityNotifications')}</li>
          </ul>
          <button 
            onClick={() => handleYocoPayment('Premium', premiumPrice * 100)}
            className="w-full py-3 rounded-xl bg-purple-500 text-white font-bold"
            disabled={loading}
          >
            {loading ? t('processing') : t('payWithYoco')}
          </button>
        </div>
      </div>
    </div>
  );
}
