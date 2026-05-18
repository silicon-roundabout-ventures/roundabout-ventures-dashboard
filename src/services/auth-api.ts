const API_URL = process.env.GATSBY_API_URL || "";

type MeResponse = {
  status: string;
  data: {
    id: number;
    create_time: string;
    update_time: string;
    email: string;
    email_verified: boolean;
    role: string;
    name: string;
  };
};

export type User = {
  id: number;
  email: string;
  role: string;
  name: string;
};

export async function fetchMe(): Promise<User | null> {
  try {
    const res = await fetch(`${API_URL}/me`, {
      credentials: "include",
      mode: "cors",
    });
    if (!res.ok) return null;
    const json: MeResponse = await res.json();
    const { id, email, role, name } = json.data;
    return { id, email, role, name };
  } catch {
    return null;
  }
}

export async function sendMagicLink(email: string): Promise<void> {
  await fetch(`${API_URL}/magic-link`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
}

export async function verifyMagicLink(xid: string, code: string): Promise<boolean> {
  try {
    const res = await fetch(`${API_URL}/verify`, {
      method: "POST",
      credentials: "include",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ xid, code }),
    });
    if (!res.ok) return false;
    const json = await res.json();
    const token = json.data?.token;
    if (token) {
      document.cookie = `x_srv_token=${token}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
    }
    return true;
  } catch {
    return false;
  }
}

export async function logoutUser(): Promise<void> {
  await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
  });
}
