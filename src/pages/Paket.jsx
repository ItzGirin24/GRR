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

const Paket = () => {
  const { currentUser } = useAuth();
  const [paketList, setPaketList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editPaket, setEditPaket] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
  });
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchPakets();
  }, []);

  const fetchPakets = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'paket'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPaketList(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load paket data', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '' });
    setEditPaket(null);
    setOpenDialog(false);
  };

  const handleAddOrUpdate = async () => {
    if (!form.title || !form.description) {
      return toast({ title: 'Error', description: 'Title and Description are required', variant: 'destructive' });
    }
    try {
      if (editPaket) {
        const paketRef = doc(db, 'paket', editPaket.id);
        await updateDoc(paketRef, {
          title: form.title,
          description: form.description,
        });
        toast({ title: 'Success', description: 'Paket updated successfully!' });
      } else {
        await addDoc(collection(db, 'paket'), {
          title: form.title,
          description: form.description,
        });
        toast({ title: 'Success', description: 'Paket added successfully!' });
      }
      fetchPakets();
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Operation failed', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'paket', id));
      toast({ title: 'Success', description: 'Paket deleted successfully!' });
      fetchPakets();
    } catch (error) {
      toast({ title: 'Error', description: 'Delete operation failed', variant: 'destructive' });
    }
  };

  return (
    <section className="container mx-auto px-6 py-10 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Paket</h1>
        {currentUser && (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button className="flex items-center bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300">
                <Plus className="h-4 w-4 mr-2" /> Add Paket
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editPaket ? 'Edit Paket' : 'Add New Paket'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Paket title"
                    autoFocus
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Paket description"
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2 justify-end">
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOrUpdate}>{editPaket ? 'Update' : 'Add'}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading paket data...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {paketList.map((paket) => (
            <Card
              key={paket.id}
              className="transform transition duration-300 hover:scale-[1.02] hover:shadow-xl cursor-pointer border-gray-200"
              tabIndex={0}
              aria-label={`Paket: ${paket.title}`}
            >
              <CardHeader>
                <CardTitle className="flex justify-between items-center text-lg md:text-xl font-bold text-blue-700">
                  <span>{paket.title}</span>
                  {currentUser && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mr-2 hover:bg-blue-50"
                            onClick={() => {
                              setEditPaket(paket);
                              setForm({
                                title: paket.title,
                                description: paket.description,
                              });
                              setOpenDialog(true);
                            }}
                            aria-label={`Edit paket ${paket.title}`}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Edit Paket</DialogTitle>
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
                          <Button size="sm" variant="destructive" aria-label={`Delete paket ${paket.title}`}>
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Paket</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this paket? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(paket.id)}>
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
                <p>{paket.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
    )}
    </section>
  );
};

export default Paket;
