import { useState } from 'react';
import apiService from '../services/api.service.js';

const TestAPI = () => {
  const [result, setResult] = useState('Click a button to test...');
  const [loading, setLoading] = useState(false);

  const runTest = async (testName, testFunction) => {
    setLoading(true);
    setResult(`Running ${testName}...`);
    
    try {
      const response = await testFunction();
      setResult(JSON.stringify(response, null, 2));
    } catch (error) {
      setResult(`ERROR: ${error.message}\n\n${error.stack}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>API Test Page</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <p><strong>API Base URL:</strong> {apiService.getBaseUrl()}</p>
        <p><strong>Environment:</strong> {import.meta.env.MODE}</p>
        <p><strong>Is Production:</strong> {String(import.meta.env.PROD)}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => runTest('Health Check', () => apiService.checkHealth())} style={{ margin: '5px' }}>
          Test Health
        </button>
        
        <button onClick={() => runTest('Get All Products', () => apiService.getProducts())} style={{ margin: '5px' }}>
          Test All Products
        </button>
        
        <button onClick={() => runTest('Get Fingerprint Products', () => apiService.getProductsByCategory('fingerprint', 10, 0))} style={{ margin: '5px' }}>
          Test Fingerprint Products
        </button>
        
        <button onClick={() => runTest('Get Categories', () => apiService.getCategories())} style={{ margin: '5px' }}>
          Test Categories
        </button>
      </div>

      <div style={{ 
        background: '#1e1e1e', 
        color: '#d4d4d4', 
        padding: '15px', 
        borderRadius: '5px',
        whiteSpace: 'pre-wrap',
        maxHeight: '500px',
        overflow: 'auto'
      }}>
        {loading ? 'Loading...' : result}
      </div>
    </div>
  );
};

export default TestAPI;