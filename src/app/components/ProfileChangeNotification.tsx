// Component for displaying and handling profile change requests
import { Check, X, AlertTriangle } from 'lucide-react';

type Employee = {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  department: string;
  joinDate: string;
  photo?: string;
  status: 'active' | 'inactive';
  address: string;
  education: string;
  skills: string[];
  jobDescription: string;
  responsibilities: string[];
};

type PendingProfileChange = {
  id: string;
  employeeId: string;
  employeeEmail: string;
  employeeName: string;
  changes: Partial<Employee>;
  requestedBy: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
};

type Props = {
  pendingChanges: PendingProfileChange[];
  onApprove: (changeId: string) => void;
  onReject: (changeId: string) => void;
};

export function ProfileChangeNotification({ pendingChanges, onApprove, onReject }: Props) {
  if (pendingChanges.length === 0) return null;

  return (
    <div className="space-y-4">
      {pendingChanges.map((change) => (
        <div key={change.id} className="bg-amber-50 border-2 border-amber-300 rounded-xl p-6 shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="text-amber-600 flex-shrink-0 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-lg mb-1">
                Permintaan Perubahan Profil
              </h3>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">{change.requestedBy}</span> telah mengajukan perubahan pada profil Anda
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(change.requestDate).toLocaleDateString('id-ID', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
          </div>

          {/* Changes Preview */}
          <div className="bg-white rounded-lg p-4 mb-4 border border-amber-200">
            <h4 className="font-semibold text-gray-900 mb-3 text-sm">Perubahan yang Diajukan:</h4>
            <div className="space-y-2 text-sm">
              {change.changes.name && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Nama:</span>
                  <span className="font-medium text-gray-900">{change.changes.name}</span>
                </div>
              )}
              {change.changes.phone && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Telepon:</span>
                  <span className="font-medium text-gray-900">{change.changes.phone}</span>
                </div>
              )}
              {change.changes.position && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Posisi:</span>
                  <span className="font-medium text-gray-900">{change.changes.position}</span>
                </div>
              )}
              {change.changes.department && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Departemen:</span>
                  <span className="font-medium text-gray-900">{change.changes.department}</span>
                </div>
              )}
              {change.changes.address && (
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span className="text-gray-600">Alamat:</span>
                  <span className="font-medium text-gray-900">{change.changes.address}</span>
                </div>
              )}
              {change.changes.status && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${change.changes.status === 'active' ? 'text-green-600' : 'text-gray-600'}`}>
                    {change.changes.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => onReject(change.id)}
              className="flex-1 px-4 py-3 bg-white border-2 border-red-500 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <X size={18} />
              Tolak
            </button>
            <button
              onClick={() => onApprove(change.id)}
              className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <Check size={18} />
              Setujui
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
