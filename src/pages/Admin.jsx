 import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { googleProvider } from '../firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../firebase';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { LogOut, Plus, Edit, Trash2, Upload, Image as ImageIcon } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Admin = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('packages');

  // Data states
  const [packages, setPackages] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Data states for services
  const [services, setServices] = useState([]);

  // Form states
  const [packageForm, setPackageForm] = useState({
    name: '', price: '', category: '', features: '', image: '', popular: false
  });
  const [galleryForm, setGalleryForm] = useState({
    title: '', category: '', image: ''
  });
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', comment: '', rating: 5, event: '', image: ''
  });

  // New service form state
  const [serviceForm, setServiceForm] = useState({
    name: '',
    description: '',
    includedItems: '',
    image: ''
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        loadData();
      }
    });

    return () => unsubscribe();
  }, []);


  const loadData = async () => {
    try {
      // Load packages
      const packagesSnapshot = await getDocs(collection(db, 'packages'));
      const packagesData = packagesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPackages(packagesData);

      // Load gallery
      const gallerySnapshot = await getDocs(collection(db, 'gallery'));
      const galleryData = gallerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGallery(galleryData);

      // Load testimonials
      const testimonialsSnapshot = await getDocs(collection(db, 'testimonials'));
      const testimonialsData = testimonialsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setTestimonials(testimonialsData);

      // Load contacts
      const contactsSnapshot = await getDocs(collection(db, 'contacts'));
      const contactsData = contactsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setContacts(contactsData);

      // Load services
      const servicesSnapshot = await getDocs(collection(db, 'services'));
      const servicesData = servicesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(servicesData);
    } catch (error) {
      console.error('Error loading data:', error);
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive"
      });
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Error signing in:', error);
      toast({
        title: "Error",
        description: "Failed to sign in",
        variant: "destructive"
      });
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const uploadImage = async (file) => {
    if (!file) return null;

    const storageRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  const handleAddPackage = async () => {
    try {
      const newPackage = {
        ...packageForm,
        features: packageForm.features.split('\n').filter(f => f.trim())
      };

      await addDoc(collection(db, 'packages'), newPackage);
      setPackageForm({ name: '', price: '', category: '', features: '', image: '', popular: false });
      loadData();
      toast({
        title: "Success",
        description: "Package added successfully"
      });
    } catch (error) {
      console.error('Error adding package:', error);
      toast({
        title: "Error",
        description: "Failed to add package",
        variant: "destructive"
      });
    }
  };


  const handleAddGalleryItem = async () => {
    try {
      const newItem = {
        ...galleryForm
      };

      await addDoc(collection(db, 'gallery'), newItem);
      setGalleryForm({ title: '', category: '', image: '' });
      loadData();
      toast({
        title: "Success",
        description: "Gallery item added successfully"
      });
    } catch (error) {
      console.error('Error adding gallery item:', error);
      toast({
        title: "Error",
        description: "Failed to add gallery item",
        variant: "destructive"
      });
    }
  };



const handleAddTestimonial = async () => {
  try {
    const newTestimonial = {
      ...testimonialForm,
      date: new Date().toLocaleDateString('id-ID'),
    };

    await addDoc(collection(db, 'testimonials'), newTestimonial);

    setTestimonialForm({
      name: '',
      comment: '',
      rating: 5,
      event: '',
      image: '',
    });

    loadData();

    toast({
      title: "Success",
      description: "Testimonial added successfully",
    });
  } catch (error) {
    console.error("Error adding testimonial:", error);
    toast({
      title: "Error",
      description: "Failed to add testimonial",
      variant: "destructive",
    });
  }
};

  const handleDeletePackage = async (id) => {
    try {
      await deleteDoc(doc(db, 'packages', id));
      loadData();
      toast({
        title: "Success",
        description: "Package deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting package:', error);
      toast({
        title: "Error",
        description: "Failed to delete package",
        variant: "destructive"
      });
    }
  };



  const handleDeleteTestimonial = async (id) => {
    try {
      await deleteDoc(doc(db, 'testimonials', id));
      loadData();
      toast({
        title: "Success",
        description: "Testimonial deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting testimonial:', error);
      toast({
        title: "Error",
        description: "Failed to delete testimonial",
        variant: "destructive"
      });
    }
  };

  const handleDeleteService = async (id) => {
    try {
      await deleteDoc(doc(db, 'services', id));
      loadData();
      toast({
        title: "Success",
        description: "Service deleted successfully"
      });
    } catch (error) {
      console.error('Error deleting service:', error);
      toast({
        title: "Error",
        description: "Failed to delete service",
        variant: "destructive"
      });
    }
  };

  const handleAddService = async () => {
    try {
      const newService = {
        ...serviceForm,
        includedItems: serviceForm.includedItems.split('\n').filter(item => item.trim()),
        image: serviceForm.image
      };

      await addDoc(collection(db, 'services'), newService);
      setServiceForm({ name: '', description: '', includedItems: '', image: '' });
      loadData();
      toast({
        title: "Success",
        description: "Service added successfully"
      });
    } catch (error) {
      console.error('Error adding service:', error);
      toast({
        title: "Error",
        description: "Failed to add service",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div id="login-section" className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">Admin Login</CardTitle>
            <p className="text-gray-600">Login to access admin panel</p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {error && <p className="text-red-500">{error}</p>}
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                onClick={async () => {
                  setError('');
                  try {
                    await signInWithEmailAndPassword(auth, email, password);
                  } catch (error) {
                    setError(error.message);
                  }
                }}
                className="w-full"
              >
                Sign in with Email
              </Button>
              <Button onClick={handleGoogleSignIn} className="w-full bg-red-600 hover:bg-red-700 mt-2">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Admin Panel - Griya Rias Ratih</h1>
            {user ? (
              <div className="flex items-center space-x-4">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || user.email}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : null}
                <span className="text-gray-600">{user.displayName || user.email}</span>
                <Button onClick={handleSignOut} variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const loginSection = document.getElementById('login-section');
                    if (loginSection) {
                      loginSection.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Login
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="packages">Packages</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            <TabsTrigger value="contacts">Contacts</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
          </TabsList>

          {/* Packages Tab */}
          <TabsContent value="packages" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Manage Packages</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Package
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Package</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="package-name">Name</Label>
                      <Input
                        id="package-name"
                        value={packageForm.name}
                        onChange={(e) => setPackageForm({...packageForm, name: e.target.value})}
                        placeholder="Package name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="package-price">Price</Label>
                      <Input
                        id="package-price"
                        value={packageForm.price}
                        onChange={(e) => setPackageForm({...packageForm, price: e.target.value})}
                        placeholder="Package price"
                      />
                    </div>
                    <div>
                      <Label htmlFor="package-category">Category</Label>
                      <Input
                        id="package-category"
                        value={packageForm.category}
                        onChange={(e) => setPackageForm({...packageForm, category: e.target.value})}
                        placeholder="Package category"
                      />
                    </div>
                    <div>
                      <Label htmlFor="package-features">Features (one per line)</Label>
                      <Textarea
                        id="package-features"
                        value={packageForm.features}
                        onChange={(e) => setPackageForm({...packageForm, features: e.target.value})}
                        placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
                        rows={4}
                      />
                    </div>
                    <div>
                      <Label htmlFor="package-image">Image URL</Label>
                      <Input
                        id="package-image"
                        type="text"
                        placeholder="Enter image URL"
                        value={packageForm.image}
                        onChange={(e) => setPackageForm({ ...packageForm, image: e.target.value })}
                      />
                      {packageForm.image && (
                        <img
                          src={packageForm.image}
                          alt="Preview"
                          className="mt-2 h-32 w-auto object-contain rounded"
                          onError={(e) => (e.target.style.display = 'none')}
                        />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="package-popular"
                        checked={packageForm.popular}
                        onChange={(e) => setPackageForm({...packageForm, popular: e.target.checked})}
                      />
                      <Label htmlFor="package-popular">Popular Package</Label>
                    </div>
                    <Button onClick={handleAddPackage} className="w-full">
                      Add Package
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <Card key={pkg.id}>
                  <CardContent className="p-6">
                    {pkg.image && (
                      <img src={pkg.image} alt={pkg.name} className="w-full h-32 object-cover rounded mb-4" />
                    )}
                    <h3 className="font-semibold text-lg">{pkg.name}</h3>
                    <p className="text-amber-600 font-bold">{pkg.price}</p>
                    <p className="text-sm text-gray-600">{pkg.category}</p>
                    {pkg.popular && <Badge className="mt-2">Popular</Badge>}
                    <div className="flex space-x-2 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Gallery Item</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-gallery-title">Title</Label>
                              <Input
                                id="edit-gallery-title"
                                type="text"
                                defaultValue={item.title}
                                onChange={(e) => setEditGalleryForm({...editGalleryForm, title: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-gallery-category">Category</Label>
                              <Input
                                id="edit-gallery-category"
                                type="text"
                                defaultValue={item.category}
                                onChange={(e) => setEditGalleryForm({...editGalleryForm, category: e.target.value})}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-gallery-image">Image URL</Label>
                              <Input
                                id="edit-gallery-image"
                                type="text"
                                defaultValue={item.image}
                                onChange={(e) => setEditGalleryForm({...editGalleryForm, image: e.target.value})}
                              />
                            </div>
                            <Button
                              onClick={async () => {
                                try {
                                  const galleryRef = doc(db, 'gallery', item.id);
                                  await updateDoc(galleryRef, {
                                    title: editGalleryForm.title || item.title,
                                    category: editGalleryForm.category || item.category,
                                    image: editGalleryForm.image || item.image,
                                  });
                                  loadData();
                                  toast({
                                    title: "Success",
                                    description: "Gallery item updated successfully",
                                  });
                                } catch (error) {
                                  console.error("Error updating gallery item:", error);
                                  toast({
                                    title: "Error",
                                    description: "Failed to update gallery item",
                                    variant: "destructive",
                                  });
                                }
                              }}
                              className="w-full"
                            >
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Package</DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="edit-package-name">Name</Label>
                          <Input
                            id="edit-package-name"
                            type="text"
                            defaultValue={pkg.name}
                            onChange={(e) => setEditPackageForm({...editPackageForm, name: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-package-price">Price</Label>
                          <Input
                            id="edit-package-price"
                            type="text"
                            defaultValue={pkg.price}
                            onChange={(e) => setEditPackageForm({...editPackageForm, price: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-package-category">Category</Label>
                          <Input
                            id="edit-package-category"
                            type="text"
                            defaultValue={pkg.category}
                            onChange={(e) => setEditPackageForm({...editPackageForm, category: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-package-features">Features</Label>
                          <Textarea
                            id="edit-package-features"
                            rows={4}
                            defaultValue={pkg.features ? pkg.features.join('\n') : ''}
                            onChange={(e) => setEditPackageForm({...editPackageForm, features: e.target.value})}
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-package-image">Image URL</Label>
                          <Input
                            id="edit-package-image"
                            type="text"
                            defaultValue={pkg.image}
                            onChange={(e) => setEditPackageForm({...editPackageForm, image: e.target.value})}
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            id="edit-package-popular"
                            type="checkbox"
                            defaultChecked={pkg.popular}
                            onChange={(e) => setEditPackageForm({...editPackageForm, popular: e.target.checked})}
                          />
                          <Label htmlFor="edit-package-popular">Popular Package</Label>
                        </div>
                        <Button
                          onClick={async () => {
                            try {
                              const packageRef = doc(db, 'packages', pkg.id);
                              await updateDoc(packageRef, {
                                name: editPackageForm.name || pkg.name,
                                price: editPackageForm.price || pkg.price,
                                category: editPackageForm.category || pkg.category,
                                features: editPackageForm.features ? editPackageForm.features.split('\n').filter(f => f.trim()) : pkg.features,
                                image: editPackageForm.image || pkg.image,
                                popular: editPackageForm.popular !== undefined ? editPackageForm.popular : pkg.popular,
                              });
                              loadData();
                              toast({
                                title: "Success",
                                description: "Package updated successfully",
                              });
                            } catch (error) {
                              console.error("Error updating package:", error);
                              toast({
                                title: "Error",
                                description: "Failed to update package",
                                variant: "destructive",
                              });
                            }
                          }}
                          className="w-full"
                        >
                          Save Changes
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Package</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this package? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeletePackage(pkg.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Manage Gallery</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Image
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add Gallery Image</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="gallery-title">Title</Label>
                      <Input
                        id="gallery-title"
                        value={galleryForm.title}
                        onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
                        placeholder="Image title"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gallery-category">Category</Label>
                      <Input
                        id="gallery-category"
                        value={galleryForm.category}
                        onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value})}
                        placeholder="Image category"
                      />
                    </div>
                    <div>
                      <Label htmlFor="gallery-image">Image URL</Label>
                      <Input
                        id="gallery-image"
                        type="text"
                        placeholder="Enter image URL"
                        value={galleryForm.image}
                        onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                      />
                      {galleryForm.image && (
                        <img
                          src={galleryForm.image}
                          alt="Preview"
                          className="mt-2 h-32 w-auto object-contain rounded"
                          onError={(e) => (e.target.style.display = 'none')}
                        />
                      )}
                    </div>
                    <Button onClick={handleAddGalleryItem} className="w-full">
                      Add Image
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {gallery.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <img src={item.image} alt={item.title} className="w-full h-32 object-cover rounded mb-2" />
                    <h3 className="font-semibold text-sm">{item.title}</h3>
                    <p className="text-xs text-gray-600">{item.category}</p>
                    <div className="flex space-x-2 mt-2">
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Image</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this image? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteGalleryItem(item.id, item.image)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Contacts Tab */}
        <TabsContent value="contacts" className="space-y-6">
          <h2 className="text-xl font-semibold">Contact Messages</h2>

          <div className="space-y-4">
            {contacts.map((contact) => (
              <Card key={contact.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{contact.name}</h3>
                      <p className="text-sm text-gray-600">
                        {contact.email} | {contact.phone}
                      </p>
                      <p className="mt-2 text-gray-700">{contact.message}</p>
                      <p className="text-xs text-gray-500 mt-2">
                        {contact.timestamp?.toDate?.().toLocaleString("id-ID")}
                      </p>
                    </div>

                    <Badge variant="outline">New</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}

            {contacts.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No contact messages yet
              </p>
            )}
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">Manage Services</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Service
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New Service</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="service-name">Name</Label>
                    <Input
                      id="service-name"
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                      placeholder="Service name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-description">Description</Label>
                    <Textarea
                      id="service-description"
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                      placeholder="Service description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-includedItems">Included Items (one per line)</Label>
                    <Textarea
                      id="service-includedItems"
                      value={serviceForm.includedItems}
                      onChange={(e) => setServiceForm({...serviceForm, includedItems: e.target.value})}
                      placeholder="Item 1&#10;Item 2&#10;Item 3"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label htmlFor="service-image">Image URL</Label>
                    <Input
                      id="service-image"
                      type="text"
                      placeholder="Enter image URL"
                      value={serviceForm.image}
                      onChange={(e) => setServiceForm({ ...serviceForm, image: e.target.value })}
                    />
                    {serviceForm.image && (
                      <img
                        src={serviceForm.image}
                        alt="Preview"
                        className="mt-2 h-32 w-auto object-contain rounded"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    )}
                  </div>
                  <Button onClick={handleAddService} className="w-full">
                    Add Service
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        </Tabs>

</div>    
</div>    

  );
};

export default Admin;
