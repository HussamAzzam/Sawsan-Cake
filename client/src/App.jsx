import { AuthProvider, useAuth } from "./context/AuthContext";
import ImageUpload from "./components/ImageUpload";

function Dashboard() {
  const { user, loading, loginWithGoogle, logout } = useAuth();

  if (loading) return <p>Loading...</p>;

  if (!user) {
    return (
      <div>
        <h1>Welcome</h1>
        <button onClick={loginWithGoogle}>Sign in with Google</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Hi, {user.name}</h1>
      {user.avatar && <img src={user.avatar} alt="avatar" width="60" style={{ borderRadius: "50%" }} />}
      <button onClick={logout}>Logout</button>
      <hr />
      <h2>Upload an image</h2>
      <ImageUpload />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Dashboard />
    </AuthProvider>
  );
}

export default App;
