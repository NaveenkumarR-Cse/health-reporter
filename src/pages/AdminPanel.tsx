import Navbar from "@/components/Navbar";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { UserPlus, Users, Shield, Heart } from "lucide-react";

const AdminPanel = () => {
  const { communityUsers, addCommunityUser, healthWorkers, user } = useAuth();
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", mobile: "", village: "", password: "" });

  const handleAddCommunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile || !form.village || !form.password) {
      toast({ title: "Missing fields", description: "Please fill all fields.", variant: "destructive" });
      return;
    }
    addCommunityUser({ name: form.name, email: form.email, mobile: form.mobile, village: form.village, password: form.password } as any);
    toast({ title: "Community user added!", description: `${form.name} can now login.` });
    setForm({ name: "", email: "", mobile: "", village: "", password: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-heading font-bold">Admin <span className="gradient-text">Panel</span></h1>
          <p className="text-muted-foreground mt-1">Manage users and system settings</p>
          <p className="text-sm text-primary mt-2">Logged in as: <span className="font-semibold">{user?.name}</span></p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Add Community User */}
          <div className="glass-card p-6">
            <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-primary" /> Add Community User
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              Community users can login to view health data and receive alerts for their village.
            </p>
            <form onSubmit={handleAddCommunity} className="space-y-3">
              <div>
                <Label>Full Name</Label>
                <Input placeholder="Enter name" className="mt-1" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
              </div>
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="user@example.com" className="mt-1" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
              </div>
              <div>
                <Label>Mobile Number</Label>
                <Input placeholder="+91 XXXXXXXXXX" className="mt-1" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} required />
              </div>
              <div>
                <Label>Village</Label>
                <Input placeholder="Village name" className="mt-1" value={form.village} onChange={(e) => setForm({ ...form, village: e.target.value })} required />
              </div>
              <div>
                <Label>Password</Label>
                <Input type="password" placeholder="Set password" className="mt-1" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
              </div>
              <Button type="submit" className="w-full gap-2">
                <UserPlus className="w-4 h-4" /> Add Community User
              </Button>
            </form>
          </div>

          {/* User Lists */}
          <div className="space-y-6">
            {/* Health Workers */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" /> Health Workers ({healthWorkers.length})
              </h3>
              <div className="space-y-2">
                {healthWorkers.map((hw) => (
                  <div key={hw.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{hw.name}</p>
                      <p className="text-xs text-muted-foreground">{hw.email}</p>
                    </div>
                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Active</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Users */}
            <div className="glass-card p-6">
              <h3 className="font-heading font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" /> Community Users ({communityUsers.length})
              </h3>
              {communityUsers.length === 0 ? (
                <p className="text-sm text-muted-foreground">No community users added yet.</p>
              ) : (
                <div className="space-y-2">
                  {communityUsers.map((cu) => (
                    <div key={cu.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{cu.name}</p>
                        <p className="text-xs text-muted-foreground">{cu.email} • {cu.village}</p>
                      </div>
                      <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">Active</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
