import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Trophy, Target, TrendingUp, Edit3, Save, X, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { fetchProfile, updateProfile as updateProfileRequest, completeMission } from "@/lib/api";
import { missions } from "@/data/missions";

interface UserProfile {
  id: string;
  username: string;
  email: string;
  avatar: string;
  level: number;
  experience: number;
  achievements: string[];
  gameStats: {
    battlesWon: number;
    battlesLost: number;
    totalBattles: number;
    favoriteCharacter: string;
  };
  progress: {
    completedMissions: string[];
    unlockedCharacters: string[];
    currentStreak: number;
  };
}

const Profile = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ username: '', avatar: '' });
  const { toast } = useToast();

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        window.location.href = '/login';
        return;
      }

      const userData = await fetchProfile();
      setUser(userData);
      setEditForm({ username: userData.username, avatar: userData.avatar });
    } catch (error: any) {
      console.error('Error loading profile:', error);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      toast({
        title: "Error",
        description: error.message || "Failed to load profile",
        variant: "destructive",
      });
      window.location.href = '/login';
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const updatedUser = await updateProfileRequest(editForm);
      setUser(updatedUser.user);
      setEditing(false);
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to update profile",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

  const handleCompleteMission = async (missionId: string) => {
    try {
      const result = await completeMission(missionId);
      toast({
        title: 'Mission complete',
        description: `+${result.experienceGained} XP earned`,
      });
      await loadProfile();
    } catch (error: any) {
      toast({
        title: 'Mission error',
        description: error.message || 'Unable to complete mission',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-24 pb-16 flex items-center justify-center">
        <Card className="glass-card">
          <CardContent className="text-center py-8">
            <User className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">Please log in to view your profile</p>
            <Button onClick={() => window.location.href = '/login'}>
              Go to Login
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const experienceForNextLevel = (user.level * 100);
  const experienceProgress = (user.experience % 100);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl md:text-4xl font-display font-bold text-gradient">
                Your Profile
              </h1>
              <div className="flex gap-2">
                {!editing ? (
                  <Button
                    onClick={() => setEditing(true)}
                    variant="outline"
                    size="sm"
                  >
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                ) : (
                  <>
                    <Button
                      onClick={handleSaveProfile}
                      size="sm"
                      className="gradient-accent text-accent-foreground"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button
                      onClick={() => {
                        setEditing(false);
                        setEditForm({ username: user.username, avatar: user.avatar });
                      }}
                      variant="outline"
                      size="sm"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                )}
                <Button
                  onClick={handleLogout}
                  variant="destructive"
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Profile Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="w-24 h-24 rounded-full bg-muted border-4 border-accent mx-auto mb-4 flex items-center justify-center">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.username} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <User className="w-12 h-12 text-muted-foreground" />
                      )}
                    </div>
                    {editing ? (
                      <div className="space-y-2">
                        <Input
                          value={editForm.username}
                          onChange={(e) => setEditForm(prev => ({ ...prev, username: e.target.value }))}
                          placeholder="Username"
                        />
                        <Input
                          value={editForm.avatar}
                          onChange={(e) => setEditForm(prev => ({ ...prev, avatar: e.target.value }))}
                          placeholder="Avatar URL"
                        />
                      </div>
                    ) : (
                      <>
                        <h2 className="text-xl font-bold">{user.username}</h2>
                        <p className="text-muted-foreground">{user.email}</p>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Level & Progress */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Level & Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-accent mb-2">Level {user.level}</div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Experience</span>
                        <span>{user.experience} / {experienceForNextLevel}</span>
                      </div>
                      <Progress value={experienceProgress} className="h-2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-500">{user.gameStats.battlesWon}</div>
                      <div className="text-sm text-muted-foreground">Wins</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-red-500">{user.gameStats.battlesLost}</div>
                      <div className="text-sm text-muted-foreground">Losses</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Achievements & Missions */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {user.achievements.length > 0 ? (
                      user.achievements.map((achievement, index) => (
                        <Badge key={index} variant="secondary" className="w-full justify-center py-2">
                          {achievement}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center py-4">
                        No achievements yet. Keep playing to unlock them!
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <h4 className="font-semibold mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      Missions Completed
                    </h4>
                    <div className="text-2xl font-bold text-accent">
                      {user.progress.completedMissions.length}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Missions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5" />
                  Missions & Rewards
                </CardTitle>
                <CardDescription>Track progress and complete challenges to earn XP.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                {missions.map((mission) => {
                  const completed = user.progress.completedMissions.includes(mission.id);
                  return (
                    <div key={mission.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-2xl bg-muted/80">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold">{mission.title}</span>
                          {completed && <Badge variant="secondary">Completed</Badge>}
                        </div>
                        <p className="text-sm text-muted-foreground">{mission.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-accent">+{mission.reward} XP</span>
                        <Button
                          size="sm"
                          disabled={completed}
                          onClick={() => handleCompleteMission(mission.id)}
                          className={completed ? 'opacity-50' : 'gradient-accent text-accent-foreground'}
                        >
                          {completed ? 'Done' : 'Complete'}
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>

          {/* Game Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6"
          >
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Game Statistics</CardTitle>
                <CardDescription>Your battle performance and progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.gameStats.totalBattles}</div>
                    <div className="text-sm text-muted-foreground">Total Battles</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-500">
                      {user.gameStats.totalBattles > 0
                        ? Math.round((user.gameStats.battlesWon / user.gameStats.totalBattles) * 100)
                        : 0}%
                    </div>
                    <div className="text-sm text-muted-foreground">Win Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">{user.progress.unlockedCharacters.length}</div>
                    <div className="text-sm text-muted-foreground">Characters Unlocked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-accent">{user.progress.currentStreak}</div>
                    <div className="text-sm text-muted-foreground">Current Streak</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;