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
import { motion, AnimatePresence } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  hover: {
    scale: 1.05,
    boxShadow: '0px 10px 15px rgba(59, 130, 246, 0.4)',
    transition: { duration: 0.3 },
  },
};

const buttonHover = {
  scale: 1.1,
  transition: { type: 'spring', stiffness: 300 },
};

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
  }, [currentUser]);

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
    <section className="container mx-auto px-6 py-10 bg-gradient-to-r from-white via-gray-50 to-white rounded-lg shadow-lg">
      <div className="mb-4">
        <p data-testid="debug-current-user-email" className="text-sm text-gray-600">
          Current User: {currentUser && typeof currentUser.email === 'string' ? currentUser.email : 'No user logged in'}
        </p>
      </div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight flex items-center">
          Our Services
          {currentUser && currentUser.email === 'grr@admin.id' && (
            <Dialog>
              <DialogTrigger asChild>
                <motion.div whileHover={buttonHover} className="ml-4">
                  <Button
                    size="icon"
                    variant="outline"
                    className="hover:bg-blue-50"
                    aria-label="Add Service"
                  >
                    <Plus className="h-5 w-5 text-blue-700" />
                  </Button>
                </motion.div>
              </DialogTrigger>
              <DialogContent
                aria-describedby="add-service-description"
                className="max-w-sm sm:max-w-md w-full max-h-[90vh] overflow-auto"
              >
                <DialogHeader>
                  <DialogTitle>{editService ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                  <p id="add-service-description" className="sr-only">
                    Dialog to add or edit a service.
                  </p>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm sm:text-base">Name</Label>
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Service name"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-sm sm:text-base">Description</Label>
                    <Textarea
                      id="description"
                      value={form.description}
                      onChange={(e) => setForm({ ...form, description: e.target.value })}
                      placeholder="Service description"
                      rows={3}
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="includedItems" className="text-sm sm:text-base">Included Items (one per line)</Label>
                    <Textarea
                      id="includedItems"
                      value={form.includedItems}
                      onChange={(e) => setForm({ ...form, includedItems: e.target.value })}
                      placeholder="Item 1\nItem 2\nItem 3"
                      rows={4}
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="image" className="text-sm sm:text-base">Image URL</Label>
                    <Input
                      id="image"
                      value={form.image}
                      onChange={(e) => setForm({ ...form, image: e.target.value })}
                      placeholder="Enter image URL"
                      className="w-full text-sm sm:text-base"
                    />
                    {form.image && (
                      <img
                        src={form.image}
                        alt="Preview"
                        className="mt-2 h-24 w-auto object-contain rounded-lg border border-gray-300 shadow-md"
                        onError={(e) => (e.target.style.display = 'none')}
                      />
                    )}
                  </div>
                  <div className="flex space-x-2 justify-end">
                    <Button variant="outline" onClick={resetForm}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddOrUpdate} size="sm" className="text-sm sm:text-base">{editService ? 'Update' : 'Add'}</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </h1>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading services...</p>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <AnimatePresence>
            {services.map((service) => (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover="hover"
                tabIndex={0}
                aria-label={`Service: ${service.name}`}
                className="cursor-pointer outline-none rounded-lg"
              >
                <Card className="border-gray-200 shadow-md">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center text-lg md:text-xl font-bold text-blue-700">
                      <span>{service.name}</span>
                      {currentUser && currentUser.email === 'grr@admin.id' && (
                        <>
                          <Dialog>
                            <DialogTrigger asChild>
                              <motion.div whileHover={buttonHover} className="mr-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditService(service);
                                    setForm({
                                      name: service.name,
                                      description: service.description,
                                      includedItems: service.includedItems ? service.includedItems.join('\n') : '',
                                      image: service.image || '',
                                    });
                                  }}
                                  aria-label={`Edit service ${service.name}`}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </motion.div>
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
                                  <Button variant="outline" onClick={() => resetForm()}>
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
                              <motion.div whileHover={buttonHover}>
                                <Button size="sm" variant="destructive" aria-label={`Delete service ${service.name}`}>
                                  <Trash2 />
                                </Button>
                              </motion.div>
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
                      <ul className="list-disc list-inside mt-2 space-y-1">
                        {service.includedItems.map((item, idx) => (
                          <li key={idx} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    )}
                    {service.image && (
                      <motion.img
                        src={service.image}
                        alt={service.name}
                        className="mt-4 rounded max-h-48 object-contain"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                      />
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
};

export default Services;
