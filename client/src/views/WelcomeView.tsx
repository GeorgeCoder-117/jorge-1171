import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

import { DoughnutChart } from '../components/DoughnutChart';
import { VerticalBarChart } from '../components/VerticalBarChart';
import { SnailPay } from '../components/SnailPay';
import { CloseButton } from '../components/CloseButton';

type Tab = 'welcome' | 'snailpay';

export const WelcomeView = () => {
  const [activeTab, setActiveTab] = useState<Tab>('welcome');
  const { user, logout } = useAuth();

  if (!user) return null;

  const formattedDate = new Date(user.createdAt).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8f9fa' }}>
      {/* Sidebar */}
      <aside style={{ position: 'relative', width: '220px', backgroundColor: '#212121', padding: '1.5rem 1rem' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 400, marginBottom: '1.5rem', color: '#e9ecef' }}>
          Dashboard
        </h2>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button
            onClick={() => setActiveTab('welcome')}
            className='tabBtn'
            style={{
              backgroundColor: activeTab === 'welcome' ? '#2a5298' : '#ddd',
              fontWeight: activeTab === 'welcome' ? '600' : '400',
              color: activeTab === 'welcome' ? '#e9ecef' : '#000',
            }}
          >
            Inicio <span>❯</span>
          </button>
          <button
            onClick={() => setActiveTab('snailpay')}
            className='tabBtn'
            style={{
              backgroundColor: activeTab === 'snailpay' ? '#2a5298' : '#ddd',
              fontWeight: activeTab === 'snailpay' ? '600' : '400',
              color: activeTab === 'snailpay' ? '#e9ecef' : '#000',
            }}
          >
            SnailPay <span>❯</span>
          </button>
          <CloseButton name="Cerrar sesión" handleClick={logout}/>       
        </nav>
      </aside>

      {/* Área principal / Body */}
      <main style={{ flex: 1, padding: '1.5rem', backgroundImage: 'linear-gradient(to right, #1e3c72, #2a5298)' }}>
        {activeTab === 'welcome' ? (
          <section>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 400, color: '#e9ecef', marginBottom: '1.5rem' }}>
                Apuestas en carreras de caracoles 🐌
            </h1>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <h1 style={{ fontSize: '1.75rem', color: '#e9ecef', marginBottom: '0.5rem' }}>
                    ¡Bienvenido, {user.fullName}!
                </h1>
                <h1 style={{ fontSize: '1.75rem', color: '#e9ecef', marginBottom: '0.5rem' }}>
                    Saldo ${user.balance}
                </h1>
            </div>
            <p style={{ color: '#ddd', fontSize: '1rem', margin: 0 }}>
              Has iniciado sesión correctamente en la aplicación web.
            </p>
            <p style={{ color: '#ddd', fontSize: '1rem', margin: 0 }}>
              <strong>Fecha de registro:</strong> {formattedDate}
            </p>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', paddingTop: '2rem'}}>
                <DoughnutChart />
                <VerticalBarChart />
            </div>
          </section>
        ) : (
          <section>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <h1 style={{ fontSize: '1.75rem', color: '#e9ecef', marginBottom: '0.5rem' }}>
                    Carga de saldo con SnailPay
                </h1>
                <h1 style={{ fontSize: '1.75rem', color: '#e9ecef', marginBottom: '0.5rem' }}>
                    Saldo ${user.balance}
                </h1>
            </div>
            <p style={{ color: '#ddd', fontSize: '1rem', margin: 0 }}>
              Ingresa los datos para recargar en tu cuenta.
            </p>
            <br />
            <SnailPay />
          </section>
        )}
      </main>
    </div>
  );
};