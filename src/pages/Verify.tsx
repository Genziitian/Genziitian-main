import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, Printer, CheckCircle2, AlertCircle, ArrowLeft, Search, ShieldCheck } from 'lucide-react';

interface Employee {
  employee_id: string;
  full_name: string;
  department: string;
  role: string;
  tenure: string;
  status: string;
}

const DEFAULT_EMPLOYEES: Employee[] = [
  {
    employee_id: 'GENZ-EMP-0000',
    full_name: 'Raj Singh',
    department: 'Programming',
    role: 'Educator',
    tenure: '25/09/2025 - Present',
    status: 'ACTIVE'
  },
  {
    employee_id: 'GENZ-EMP-0001',
    full_name: 'Vaibhav',
    department: 'Academics',
    role: 'Educator',
    tenure: 'June 2025 - Present',
    status: 'ACTIVE'
  },
  {
    employee_id: 'GENZ-EMP-0002',
    full_name: 'Ayush',
    department: 'Academics',
    role: 'Educator',
    tenure: 'July 2025 - Present',
    status: 'ACTIVE'
  },
  {
    employee_id: 'GENZ-EMP-0003',
    full_name: 'Ankit K.',
    department: 'Academics',
    role: 'Educator',
    tenure: 'August 2025 - May 2026',
    status: 'INACTIVE'
  },
  {
    employee_id: 'GENZ-INT-0000N',
    full_name: 'Neha Sharma',
    department: 'Operations',
    role: 'Intern',
    tenure: 'May 2025 - November 2025',
    status: 'RESIGNED'
  }
];

export default function Verify() {
  const [employeeId, setEmployeeId] = useState('');
  const [fullName, setFullName] = useState('');
  const [searching, setSearching] = useState(false);
  const [result, setResult] = useState<Employee | null>(null);
  const [searched, setSearched] = useState(false);
  const [verifyTime, setVerifyTime] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Guideline Accordion States
  const [openGuideline, setOpenGuideline] = useState<'protocol' | 'discrepancy' | null>('protocol');

  // Print style injection
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @media print {
        body * {
          visibility: hidden;
        }
        #print-area, #print-area * {
          visibility: visible;
        }
        #print-area {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          border: none !important;
          box-shadow: none !important;
        }
        .no-print {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!employeeId.trim() || !fullName.trim()) return;

    setSearching(true);
    setResult(null);
    setSearched(false);
    setErrorMsg('');

    try {
      // 1. Try to search from Supabase database
      const { data, error } = await supabase
        .from('employees')
        .select('*')
        .eq('employee_id', employeeId.trim());

      let found: Employee | undefined = undefined;

      if (data && data.length > 0) {
        // Find matching name case-insensitively
        found = data.find(
          (emp) => emp.full_name.trim().toLowerCase() === fullName.trim().toLowerCase()
        );
      }

      // 2. If not found in DB, check mock local storage records
      if (!found) {
        try {
          const stored = localStorage.getItem('gzi_mock_employees');
          if (stored) {
            const mockList: Employee[] = JSON.parse(stored);
            found = mockList.find(
              (emp) =>
                emp.employee_id.trim().toLowerCase() === employeeId.trim().toLowerCase() &&
                emp.full_name.trim().toLowerCase() === fullName.trim().toLowerCase()
            );
          }
        } catch (err) {
          console.error('Error parsing mock storage:', err);
        }
      }

      // 3. Fallback to pre-populated hardcoded DEFAULT_EMPLOYEES
      if (!found) {
        found = DEFAULT_EMPLOYEES.find(
          (emp) =>
            emp.employee_id.trim().toLowerCase() === employeeId.trim().toLowerCase() &&
            emp.full_name.trim().toLowerCase() === fullName.trim().toLowerCase()
        );
      }

      if (found) {
        setResult(found);
        const now = new Date();
        setVerifyTime(
          now.toLocaleDateString('en-GB') + ', ' + now.toLocaleTimeString('en-US', { hour12: false })
        );
      } else {
        setErrorMsg('No official record found matching the details provided. Please check the ID and Name.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setErrorMsg('An error occurred while querying the registry. Please try again.');
    } finally {
      setSearching(false);
      setSearched(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50/50 py-12 px-6">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Navigation / Header (Hidden when printing) */}
        <div className="flex items-center justify-between border-b-2 border-gray-100 pb-6 no-print">
          <Link to="/careers" className="flex items-center gap-2 text-gray-600 font-bold hover:text-[#0b1120] transition-colors">
            <ArrowLeft className="w-5 h-5" /> Back to Careers
          </Link>
          <div className="flex items-center gap-2 text-xs font-black bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg border">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> SECURE REGISTRY
          </div>
        </div>

        {/* Two Column Layout: Info and Form (Hidden when printing) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start no-print">
          
          {/* Left Column: Info Text */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <h1 className="text-4xl md:text-5xl font-black text-[#0b1120] tracking-tight leading-tight">
              Personnel Verification
            </h1>
            <p className="text-gray-600 font-medium text-lg leading-relaxed">
              Official portal for validating internship and employment records of Gen-Z IITians. Data is retrieved in real-time from the central HR registry.
            </p>
          </div>

          {/* Right Column: Verification Form */}
          <div className="lg:col-span-6 bg-white border-2 border-gray-200 rounded-3xl p-8 shadow-sm">
            <h2 className="text-xs font-black text-gray-400 tracking-widest uppercase mb-6 text-left">
              SEARCH REGISTRY
            </h2>
            <form onSubmit={handleSearch} className="space-y-6 text-left">
              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                  EMPLOYEE / INTERN ID
                </label>
                <input 
                  required 
                  type="text" 
                  value={employeeId}
                  onChange={(e) => setEmployeeId(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors font-semibold outline-none text-gray-800 placeholder-gray-400" 
                  placeholder="GENZ-EMP-0000"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-gray-500 uppercase tracking-wider mb-2">
                  FULL LEGAL NAME
                </label>
                <input 
                  required 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-0 transition-colors font-semibold outline-none text-gray-800 placeholder-gray-400" 
                  placeholder="As per records"
                />
              </div>

              <button 
                type="submit" 
                disabled={searching}
                className="w-full py-4 bg-[#0b1120] text-white font-black rounded-xl hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 shadow-[4px_4px_0px_#0b1120] hover:shadow-[4px_4px_0px_#10b981]"
              >
                {searching ? 'VALIDATING...' : 'VALIDATE RECORD'}
              </button>
            </form>
          </div>
        </div>

        {/* Verification Result Card (Visible during print if active) */}
        {searched && (
          <div className="max-w-3xl mx-auto text-left" id="print-area">
            {result ? (
              <div className="bg-white border-2 border-gray-200 rounded-2xl shadow-sm overflow-hidden">
                {/* Heading */}
                <div className="border-b border-gray-100 px-6 py-4 flex items-center justify-between bg-gray-50/50">
                  <div className="flex items-center gap-2 text-xs font-black text-emerald-600 tracking-wider">
                    <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></span>
                    RECORD FOUND
                  </div>
                  <div className="text-xs font-bold text-gray-400 font-mono">
                    REF: {result.employee_id}
                  </div>
                </div>

                {/* Table Data */}
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border-collapse text-left">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider bg-gray-50/30">FIELD</th>
                        <th className="px-6 py-3 text-xs font-black text-gray-400 uppercase tracking-wider bg-gray-50/30">VALIDATED DETAIL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                      <tr>
                        <td className="px-6 py-4.5 text-gray-500 font-bold">Full Name</td>
                        <td className="px-6 py-4.5 text-[#0b1120] font-black text-base">{result.full_name}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4.5 text-gray-500 font-bold">Department</td>
                        <td className="px-6 py-4.5 text-gray-800">{result.department}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4.5 text-gray-500 font-bold">Role / Position</td>
                        <td className="px-6 py-4.5 text-gray-800 capitalize">{result.role}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4.5 text-gray-500 font-bold">Tenure</td>
                        <td className="px-6 py-4.5 text-gray-800 font-mono text-xs">{result.tenure}</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4.5 text-gray-500 font-bold">Current Status</td>
                        <td className="px-6 py-4.5">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            result.status.toUpperCase() === 'ACTIVE' 
                              ? 'bg-emerald-50 text-emerald-700' 
                              : result.status.toUpperCase() === 'RESIGNED'
                              ? 'bg-orange-50 text-orange-700'
                              : result.status.toUpperCase() === 'REMOVED'
                              ? 'bg-red-50 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {result.status}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Footer bar */}
                <div className="border-t border-gray-100 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gray-50/30">
                  <div className="text-xs text-gray-400 font-bold">
                    Verified at: {verifyTime}
                  </div>
                  <button 
                    onClick={handlePrint}
                    className="no-print flex items-center gap-2 px-5 py-2.5 bg-[#0b1120] text-white font-black text-xs rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
                  >
                    <Printer className="w-4 h-4" /> PRINT OFFICIAL RECORD
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6 text-center text-red-800 font-bold flex items-center justify-center gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>
        )}

        {/* Verification Guidelines (Hidden when printing) */}
        <div className="max-w-3xl mx-auto space-y-6 pt-6 no-print text-left">
          <h2 className="text-xs font-black text-gray-400 tracking-widest uppercase text-center mb-8">
            VERIFICATION GUIDELINES
          </h2>

          <div className="space-y-4">
            {/* Accordion 1: Verification Protocol */}
            <div className={`bg-white rounded-2xl border-2 transition-all ${
              openGuideline === 'protocol' ? 'border-blue-500 shadow-[0_4px_20px_rgb(59,130,246,0.08)]' : 'border-gray-200'
            }`}>
              <button 
                onClick={() => setOpenGuideline(openGuideline === 'protocol' ? null : 'protocol')}
                className="w-full px-6 py-5 flex items-center justify-between font-bold text-gray-800 text-base"
              >
                <span>Verification Protocol</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  openGuideline === 'protocol' ? 'rotate-180' : ''
                }`} />
              </button>
              {openGuideline === 'protocol' && (
                <div className="px-6 pb-6 text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100/55 pt-4">
                  This system queries the central Gen-Z IITians employee ledger. All records are updated in real-time upon contract completion or termination.
                </div>
              )}
            </div>

            {/* Accordion 2: Discrepancy Reporting */}
            <div className={`bg-white rounded-2xl border-2 transition-all ${
              openGuideline === 'discrepancy' ? 'border-blue-500 shadow-[0_4px_20px_rgb(59,130,246,0.08)]' : 'border-gray-200'
            }`}>
              <button 
                onClick={() => setOpenGuideline(openGuideline === 'discrepancy' ? null : 'discrepancy')}
                className="w-full px-6 py-5 flex items-center justify-between font-bold text-gray-800 text-base"
              >
                <span>Discrepancy Reporting</span>
                <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                  openGuideline === 'discrepancy' ? 'rotate-180' : ''
                }`} />
              </button>
              {openGuideline === 'discrepancy' && (
                <div className="px-6 pb-6 text-sm text-gray-600 font-medium leading-relaxed border-t border-gray-100/55 pt-4">
                  Any inconsistencies in the displayed data should be immediately reported to the Human Resources department at <a href="mailto:help@genziitian.in" className="text-blue-600 hover:underline font-bold">help@genziitian.in</a> with a copy of the original offer letter.
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
