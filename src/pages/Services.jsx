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

const Services = () => {
  const { currentUser } = useAuth();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editService, setEditService] = useState(null);
  const [form, setForm] = useState({
    name: '',
    description: '',
    includedItems: '',
    image: '',
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const snapshot = await getDocs(collection(db, 'services'));
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to load services', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ name: '', description: '', includedItems: '', image: '' });
    setEditService(null);
  };

  const handleAddOrUpdate = async () => {
    if (!form.name || !form.description) {
      return toast({ title: 'Error', description: 'Name and Description are required', variant: 'destructive' });
    }
    try {
      if (editService) {
        const serviceRef = doc(db, 'services', editService.id);
        await updateDoc(serviceRef, {
          name: form.name,
          description: form.description,
          includedItems: form.includedItems.split('\n').filter(item => item.trim()),
          image: form.image,
        });
        toast({ title: 'Success', description: 'Service updated successfully!' });
      } else {
        await addDoc(collection(db, 'services'), {
          name: form.name,
          description: form.description,
          includedItems: form.includedItems.split('\n').filter(item => item.trim()),
          image: form.image,
        });
        toast({ title: 'Success', description: 'Service added successfully!' });
      }
      fetchServices();
      resetForm();
    } catch (error) {
      toast({ title: 'Error', description: 'Operation failed', variant: 'destructive' });
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'services', id));
      toast({ title: 'Success', description: 'Service deleted successfully!' });
      fetchServices();
    } catch (error) {
      toast({ title: 'Error', description: 'Delete operation failed', variant: 'destructive' });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Services</h1>
        {currentUser && (
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" /> Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Service name"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Service description"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="includedItems">Included Items (one per line)</Label>
                  <Textarea
                    id="includedItems"
                    value={form.includedItems}
                    onChange={(e) => setForm({ ...form, includedItems: e.target.value })}
                    placeholder="Item 1\nItem 2\nItem 3"
                    rows={4}
                  />
                </div>
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="Enter image URL"
                  />
                  {form.image && (
                    <img
                      src={form.image}
                      alt="Preview"
                      className="mt-2 h-32 w-auto object-contain rounded"
                      onError={(e) => (e.target.style.display = 'none')}
                    />
                  )}
                </div>
                <div className="flex space-x-2 justify-end">
                  <Button variant="outline" onClick={resetForm}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddOrUpdate}>{editService ? 'Update' : 'Add'}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{service.name}</span>
                  {currentUser && (
                    <>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline" className="mr-2"
                            onClick={() => {
                              setEditService(service);
                              setForm({
                                name: service.name,
                                description: service.description,
                                includedItems: service.includedItems ? service.includedItems.join('\n') : '',
                                image: service.image || '',
                              });
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg">
                          <DialogHeader>
                            <DialogTitle>Edit Service</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor="edit-name">Name</Label>
                              <Input
                                id="edit-name"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                rows={3}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-includedItems">Included Items</Label>
                              <Textarea
                                id="edit-includedItems"
                                value={form.includedItems}
                                onChange={(e) => setForm({ ...form, includedItems: e.target.value })}
                                rows={4}
                              />
                            </div>
                            <div>
                              <Label htmlFor="edit-image">Image URL</Label>
                              <Input
                                id="edit-image"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                              />
                            </div>
                            <div className="flex space-x-2 justify-end">
                              <Button variant="outline" onClick={() => {
                                resetForm();
                              }}>
                                Cancel
                              </Button>
                              <Button
                                onClick={async () => {
                                  try {
                                    const serviceRef = doc(db, 'services', service.id);
                                    await updateDoc(serviceRef, {
                                      name: form.name,
                                      description: form.description,
                                      includedItems: form.includedItems.split('\n').filter(item => item.trim()),
                                      image: form.image,
                                    });
                                    toast({
                                      title: 'Success',
                                      description: 'Service updated successfully!',
                                    });
                                    fetchServices();
                                    resetForm();
                                  } catch (error) {
                                    toast({
                                      title: 'Error',
                                      description: 'Failed to update service',
                                      variant: 'destructive',
                                    });
                                  }
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
                          <Button size="sm" variant="destructive">
                            <Trash2 />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Service</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this service? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDelete(service.id)}>
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
                <p>{service.description}</p>
                {service.includedItems && (
                  <ul className="list-disc list-inside mt-2">
                    {service.includedItems.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                )}
                {service.image && (
                  <img
                    src={service.image}
                    alt={service.name}
                    className="mt-4 rounded max-h-48 object-contain"
                  />
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Services;
