import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from '@/components/ui/button';
import { Loader2Icon, Sparkle } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';

function AddNewCourseDialog({ children }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    includeVideo: false,
    noOfChapters: 1,
    category: '',
    level: ''
  });
  const router = useRouter();

  const onHandleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const onGenerate = async() => {
    const finalData = {
      name: formData.name,
      description: formData.description,
      includeVideo: formData.includeVideo,
      level: formData.level,
      noOfChapters: String(formData.noOfChapters),
      category: formData.category.charAt(0).toUpperCase() + formData.category.slice(1).toLowerCase()
    };
    console.log("🎯 Final Course Object:", finalData);
    const courseId = uuidv4();
    try{
    setLoading(true);
        const result = await axios.post('/api/generate-course-layout',{
      ...formData,
      courseId: courseId
    });
    console.log(result.data);
    setLoading(false);
    router.push('/workspace/edit-course/' + result.data?.courseId);
  }
  catch(e)
  {
    setLoading(false);
    console.log(e)
  }
  };

  // Optional debug logging
  useEffect(() => {
    console.log("🧠 formData changed:", formData);
  }, [formData]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline">➕ Create New Course</Button>
        )}
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Course Using AI</DialogTitle>
          <DialogDescription asChild>
            <div className='flex flex-col gap-4 mt-3'>

              <div>
                <label>Course Name</label>
                <Input
                  placeholder="Course Name"
                  onChange={(event) => onHandleInputChange('name', event.target.value)}
                />
              </div>

              <div>
                <label>Course Description (Optional)</label>
                <Textarea
                  placeholder="Course Description"
                  onChange={(event) => onHandleInputChange('description', event.target.value)}
                />
              </div>

              <div>
                <label>No of Chapters</label>
                <Input
                  placeholder="No of Chapters"
                  type="number"
                  onChange={(event) => onHandleInputChange('noOfChapters', event.target.value)}
                />
              </div>

              <div className='flex gap-3 items-center'>
                <label>Include Video</label>
                <Switch
                  checked={formData.includeVideo}
                  onCheckedChange={(checked) =>
                    onHandleInputChange('includeVideo', checked)
                  }
                />
              </div>

              <div>
                <label className=''>Difficulty Level</label>
                <Select onValueChange={(value) => onHandleInputChange('level', value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Difficulty Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label>Category</label>
                <Input
                  placeholder="Category (Separated by Comma)"
                  onChange={(event) => onHandleInputChange('category', event.target.value)}
                />
              </div>

              <div className="mt-5">
                <Button className={"w-full"} onClick={onGenerate} disabled={loading}>
                  {loading ? <Loader2Icon className='animate-spin'/>:
                  <Sparkle/>} Generate Course</Button>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewCourseDialog;
