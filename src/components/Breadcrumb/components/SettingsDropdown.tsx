import { useState, useRef, useEffect } from "react";
import { User, HelpCircle, LogOut, Settings } from "lucide-react";
import type { BreadcrumbTheme } from "@src/types/Breadcrumb/breadcrumb";

interface SettingsDropdownProps {
  theme: BreadcrumbTheme;
  isDark: boolean;
  onItemClick?: (itemId: string) => void;
}

interface DropdownItem {
  id: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

const SettingsDropdown = ({
  theme,
  isDark,
  onItemClick,
}: SettingsDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const dropdownItems: DropdownItem[] = [
    { id: "profile", label: "Profile", icon: User },
    { id: "help", label: "Help", icon: HelpCircle },
    { id: "logout", label: "Log Out", icon: LogOut },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleItemClick = (itemId: string) => {
    setIsOpen(false);
    if (onItemClick) {
      onItemClick(itemId);
    }
  };

  const dropdownStyle = {
    backgroundColor: isDark ? "rgba(4, 5, 16, 0.95)" : "#FFFFFF",
    border: `1px solid ${isDark ? "#56577A" : "#E2E8F0"}`,
    borderRadius: "12px",
    boxShadow: isDark
      ? "0 8px 32px rgba(0, 0, 0, 0.4)"
      : "0 8px 32px rgba(0, 0, 0, 0.1)",
    backdropFilter: "blur(20px)",
  };

  const itemStyle = (isHovered: boolean) => ({
    backgroundColor: isHovered
      ? isDark
        ? "rgba(130, 140, 232, 0.1)"
        : "rgba(108, 121, 239, 0.08)"
      : "transparent",
    color: isDark ? "#E4E6F6" : "#2D3748",
    transition: "all 0.2s ease",
    borderRadius: "8px",
    margin: "0 8px",
  });

  const iconColor = isDark ? "#828CE8" : "#6C79EF";

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Settings Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg transition-all duration-200 hover:opacity-70 cursor-pointer"
      >
        <Settings size={20} color={theme.userMenu.iconColor} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          className="absolute right-0 top-full mt-2 w-52 py-2 z-50"
          style={dropdownStyle}
        >
          {dropdownItems.map((item) => {
            const IconComponent = item.icon;
            const isLogout = item.id === "logout";
            const logoutIconColor = isDark ? "#F56565" : "#E53E3E";
            const logoutTextColor = isDark ? "#F56565" : "#E53E3E";

            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="w-47 px-3 py-3 flex items-center gap-3 text-left text-sm font-medium transition-all duration-200 cursor-pointer"
                style={itemStyle(false)}
                onMouseEnter={(e) => {
                  if (isLogout) {
                    e.currentTarget.style.backgroundColor = isDark
                      ? "rgba(245, 101, 101, 0.1)"
                      : "rgba(229, 62, 62, 0.08)";
                  } else {
                    e.currentTarget.style.backgroundColor = isDark
                      ? "rgba(130, 140, 232, 0.1)"
                      : "rgba(108, 121, 239, 0.08)";
                  }
                  e.currentTarget.style.borderRadius = "8px";
                  e.currentTarget.style.margin = "0 8px";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.borderRadius = "8px";
                  e.currentTarget.style.margin = "0 8px";
                }}
              >
                <IconComponent
                  size={18}
                  color={isLogout ? logoutIconColor : iconColor}
                />
                <span
                  style={{
                    color: isLogout
                      ? logoutTextColor
                      : isDark
                      ? "#E4E6F6"
                      : "#2D3748",
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SettingsDropdown;
