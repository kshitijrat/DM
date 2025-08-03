// src/components/SignupPromptDialog.jsx
import { Dialog } from '@headlessui/react';
import { GiftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SignupPromptDialog = ({ open, onClose, redirectTo = "/signup" }) => {
  const navigate = useNavigate(); // useNavigate hook
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center px-4">
        <Dialog.Panel className="bg-gradient-to-br from-white via-blue-50 to-blue-100 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 rounded-2xl p-6 max-w-md w-full dark:border-b-gray-800 dark:border-t-gray-500 dark:border-e-yellow-50 dark:border-r-gray-700 dark:border-l-gray-400 border-4 shadow-2xl border-blue-200">

          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <GiftIcon className="w-6 h-6 text-yellow-400" />
            </div>
            <Dialog.Title className="text-xl font-bold dark:text-blue-50">
              Join Us to Earn Coins 🎉
            </Dialog.Title>
          </div>

          <Dialog.Description className="dark:text-gray-200 text-sm leading-relaxed">
            You're doing great! 💙<br />
            <span className="font-semibold">Signup</span> now to collect your reward and start earning more coins by helping others. <br />
            <span className="text-sm italic">"Give help, earn coins & be happy 😊"</span>
          </Dialog.Description>

          <div className="mt-5 flex justify-end">
            <button
              className="px-4 py-2 rounded-md bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 transition-colors flex items-center space-x-1"
              onClick={() => {
                onClose();
                navigate(redirectTo); // use navigate instead of window.location.href
              }}
            >
              Go to Signup
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default SignupPromptDialog;
