import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../components/ui/alert-dialog';
import { Edit, Trash2, Plus } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Galeri = () => {
  const { currentUser } = useAuth();
  const [galeriList, setGaleriList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editGaleri, setEditGaleri] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    imageUrl: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchGaleri();
  }, []);

  const fetchGaleri = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'galeri'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setGaleriList(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load galeri data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '', imageUrl: '' });
    setEditGaleri(null);
    setOpenDialog(false);
  };

  const handleAddOrUpdate = async () => {
    if (!form.title || !form.description || !form.imageUrl) {
      return toast({ title: 'Error', description: 'Title, Description, and Image URL are required', variant: 'destructive' });
    }
    try {
      if (editGaleri) {
        const galeriRef = doc(db, 'galeri', editGaleri.id);
        await updateDoc(galeriRef, {
          title: form.title,
          description: form.description,
          imageUrl: form.imageUrl,
        });
        toast({ title: 'Success', description: 'Galeri updated successfully!' });
      } else {
        await addDoc(collection(db, 'galeri'), {
          title: form.title,
          description: form.description,
          imageUrl: form.imageUrl,
        });
        toast({ title: 'Success', description: 'Galeri added successfully!' });
      }
      fetchGaleri();
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Operation failed', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'galeri', id));
      toast({ title: 'Success', description: 'Galeri deleted successfully!' });
      fetchGaleri();
    } catch (error) {
      toast({ title: 'Error', description: 'Delete operation failed', variant: 'destructive' });
    }
  };

  return (
    <section className="container mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Galeri</h1>
        {currentUser && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
                <Plus className="h-4 w-4 mr-2" /> Add Galeri
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editGaleri ? 'Edit Galeri' : 'Add New Galeri'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Galeri title"
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Galeri description"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={form.imageUrl}
                    onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="Image URL"
                  />
                  {form.imageUrl && (
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="mt-2 h-32 w-auto object-contain rounded-lg border border-gray-300 shadow-md"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  )}
                </div>
                <div className="flex space-x-2 justify-end">
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOrUpdate}>{editGaleri ? 'Update' : 'Add'}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading galeri data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {galeriList.map((galeri) => (
            <Card
              key={galeri.id}
              className="transform transition duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer border-gray-200"
              tabIndex={0}
              aria-label={`Galeri: ${galeri.title}`}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-lg md:text-xl font-bold text-blue-700">
                  <span>{galeri.title}</span>
                  {currentUser && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mr-2 hover:bg-blue-50"
                            onClick={() => {
                              setEditGaleri(galeri);
                              setForm({
                                title: galeri.title,
                                description: galeri.description,
                                imageUrl: galeri.imageUrl || '',
                              });
                              setOpenDialog(true);
                            }}
                            aria-label={`Edit galeri ${galeri.title}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Edit Galeri</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-title">Title</Label>
                              <Input
                                id="edit-title"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                autoFocus
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={4}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-imageUrl">Image URL</Label>
                              <Input
                                id="edit-imageUrl"
                                value={form.imageUrl}
                                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                              />
                            </div>
                            <div className="flex space-x-2 justify-end">
                              <Button variant="outline" onClick={resetForm}>
                                Cancel
                              </Button>
                              <Button
                                onClick={async () => {
                                  await handleAddOrUpdate();
                                  setOpenDialog(false);
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="sm" variant="destructive" aria-label={`Delete galeri ${galeri.title}`}>
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Galeri</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this galeri? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(galeri.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{galeri.description}</p>
                {galeri.imageUrl && (
                  <img
                    src={galeri.imageUrl}
                    alt={galeri.title}
                    className="mt-4 rounded max-h-48 object-contain"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default Galeri;
