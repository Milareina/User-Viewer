"use client";
import Link from "next/link";
import { SearchAutocomplete } from "@/components/SearchAutocomplete";
import { fetchUsers } from "@/api/api";
import { useEffect, useState } from "react";
import { User } from "@/types/user";

interface HeaderProps {
  showHomeButton?: boolean;
}

export const Header = ({ showHomeButton }: HeaderProps) => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchUsers()
      .then(setUsers)
      .catch((err) => console.error("Error fetching users:", err));
  }, []);

  return (
    <header className="bg-primary-gradient text-primary py-4 sticky top-0 z-50 shadow-primary opacity-primary">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="heading-primary">
          <Link href="/" className="transition">
            User Viewer
          </Link>
        </h1>
        <div className="flex items-center gap-6">
          <SearchAutocomplete users={users} />
          {showHomeButton && (
            <Link href="/">
              <button className="btn-primary">Home</button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};
