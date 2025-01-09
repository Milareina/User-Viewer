"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { User } from "@/types/user";

interface SearchAutocompleteProps {
  users: User[];
}

export const SearchAutocomplete = ({ users }: SearchAutocompleteProps) => {
  const [query, setQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [query, users]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        placeholder="Search users..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onClick={() => setIsDropdownOpen(true)}
        className="input-search"
      />

      {isDropdownOpen && filteredUsers.length > 0 && (
        <ul className="dropdown-container">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              className="dropdown-item"
              onClick={() => {
                setQuery("");
                setIsDropdownOpen(false);
              }}
            >
              <Link href={`/user/${user.id}`}>{user.name}</Link>
            </li>
          ))}
        </ul>
      )}

      {isDropdownOpen && query && filteredUsers.length === 0 && (
        <div className="dropdown-container">
          <p className="dropdown-empty">No users found</p>
        </div>
      )}
    </div>
  );
};
