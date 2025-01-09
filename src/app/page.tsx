import { fetchUsers } from "@/api/api";
import { User } from "@/types/user";
import { UserCard } from "@/components/UserCard";

export default async function HomePage() {
  let users: User[] = [];
  try {
    users = await fetchUsers();
  } catch (error) {
    console.error("Error fetching users:", error);
  }

  return (
    <div className="homepage-grid">
      {users.slice(0, 10).map((user, index) => (
        <div key={user.id} className={index === 9 ? "ten-card-centered" : ""}>
          <UserCard user={user} />
        </div>
      ))}
    </div>
  );
}
