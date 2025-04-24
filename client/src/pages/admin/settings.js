import React, { useState } from "react";
import AdminLayout from "@/components/Admin/AdminLayout";
import {
  FaCog,
  FaBell,
  FaLock,
  FaUserShield,
  FaPalette,
  FaLanguage,
  FaSave,
} from "react-icons/fa";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      emailNotifications: true,
      pushNotifications: true,
      quizReminders: true,
      resultAlerts: true,
    },
    security: {
      twoFactorAuth: false,
      sessionTimeout: 30,
      passwordPolicy: "medium",
    },
    appearance: {
      theme: "light",
      fontSize: "medium",
      sidebarCollapsed: false,
    },
    language: {
      interfaceLanguage: "en",
      dateFormat: "MM/DD/YYYY",
      timeFormat: "12h",
    },
  });

  const handleSettingChange = (category, setting, value) => {
    setSettings((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [setting]: value,
      },
    }));
  };

  const handleSaveSettings = () => {
    // TODO: Implement API call to save settings
    console.log("Saving settings:", settings);
  };

  const SettingSection = ({ title, icon, children }) => (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center mb-4">
        <div className="p-2 bg-blue-50 rounded-lg mr-3">{icon}</div>
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {children}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Settings</h1>
        <button
          onClick={handleSaveSettings}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FaSave className="mr-2" />
          Save Changes
        </button>
      </div>

      <SettingSection
        title="Notifications"
        icon={<FaBell className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-700">Email Notifications</h3>
              <p className="text-sm text-gray-500">
                Receive notifications via email
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.emailNotifications}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "emailNotifications",
                    e.target.checked
                  )
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-700">Push Notifications</h3>
              <p className="text-sm text-gray-500">
                Receive browser notifications
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.pushNotifications}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "pushNotifications",
                    e.target.checked
                  )
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-700">Quiz Reminders</h3>
              <p className="text-sm text-gray-500">
                Get reminders for upcoming quizzes
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.quizReminders}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "quizReminders",
                    e.target.checked
                  )
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-700">Result Alerts</h3>
              <p className="text-sm text-gray-500">
                Get notified when quiz results are available
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.notifications.resultAlerts}
                onChange={(e) =>
                  handleSettingChange(
                    "notifications",
                    "resultAlerts",
                    e.target.checked
                  )
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Security"
        icon={<FaLock className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-700">
                Two-Factor Authentication
              </h3>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.security.twoFactorAuth}
                onChange={(e) =>
                  handleSettingChange(
                    "security",
                    "twoFactorAuth",
                    e.target.checked
                  )
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Session Timeout</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.security.sessionTimeout}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "sessionTimeout",
                  parseInt(e.target.value)
                )
              }
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={60}>1 hour</option>
              <option value={120}>2 hours</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Password Policy</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.security.passwordPolicy}
              onChange={(e) =>
                handleSettingChange(
                  "security",
                  "passwordPolicy",
                  e.target.value
                )
              }
            >
              <option value="low">Low (Minimum 6 characters)</option>
              <option value="medium">
                Medium (Minimum 8 characters, 1 number)
              </option>
              <option value="high">
                High (Minimum 10 characters, 1 number, 1 special character)
              </option>
            </select>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Appearance"
        icon={<FaPalette className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">Theme</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.appearance.theme}
              onChange={(e) =>
                handleSettingChange("appearance", "theme", e.target.value)
              }
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System Default</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Font Size</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.appearance.fontSize}
              onChange={(e) =>
                handleSettingChange("appearance", "fontSize", e.target.value)
              }
            >
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-gray-700">Collapse Sidebar</h3>
              <p className="text-sm text-gray-500">
                Automatically collapse the sidebar
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings.appearance.sidebarCollapsed}
                onChange={(e) =>
                  handleSettingChange(
                    "appearance",
                    "sidebarCollapsed",
                    e.target.checked
                  )
                }
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>
      </SettingSection>

      <SettingSection
        title="Language & Region"
        icon={<FaLanguage className="w-5 h-5 text-blue-600" />}
      >
        <div className="space-y-4">
          <div>
            <h3 className="font-medium text-gray-700 mb-2">
              Interface Language
            </h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.language.interfaceLanguage}
              onChange={(e) =>
                handleSettingChange(
                  "language",
                  "interfaceLanguage",
                  e.target.value
                )
              }
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Date Format</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.language.dateFormat}
              onChange={(e) =>
                handleSettingChange("language", "dateFormat", e.target.value)
              }
            >
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium text-gray-700 mb-2">Time Format</h3>
            <select
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={settings.language.timeFormat}
              onChange={(e) =>
                handleSettingChange("language", "timeFormat", e.target.value)
              }
            >
              <option value="12h">12-hour (AM/PM)</option>
              <option value="24h">24-hour</option>
            </select>
          </div>
        </div>
      </SettingSection>
    </div>
  );
};

export default SettingsPage;
