/**
 * Database Seed Script.
 * Populates the database with demo dental data.
 * Run: npm run seed
 */
const { validateEnv } = require('./config/env');
validateEnv();

const mongoose = require('mongoose');
const Doctor = require('./models/Doctor');
const Service = require('./models/Service');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
const Testimonial = require('./models/Testimonial');
const GalleryItem = require('./models/GalleryItem');
const { SERVICE_CATEGORIES } = require('./utils/constants');

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Promise.all([
      Doctor.deleteMany({}),
      Service.deleteMany({}),
      Patient.deleteMany({}),
      Appointment.deleteMany({}),
      Testimonial.deleteMany({}),
      GalleryItem.deleteMany({}),
    ]);
    console.log('🗑️  Cleared existing data');

    // Create demo doctor
    const doctor = await Doctor.create({
      name: 'Dr. Ananya Sharma',
      email: 'dr.ananya@smilecare.com',
      password: 'password123',
      phone: '+91 98765-43210',
      specialization: 'Cosmetic & General Dentistry',
      qualifications: 'BDS, MDS (Cosmetic Dentistry)',
      experience: 12,
      about: 'Dr. Ananya Sharma is passionate about creating beautiful, healthy smiles. With over 12 years of experience in cosmetic dentistry, she combines artistry with advanced dental science to deliver exceptional results.',
      clinicName: 'SmileCare Dental Clinic',
      clinicAddress: '123 Marine Drive, Suite 200',
      clinicCity: 'Mumbai',
      clinicState: 'MH',
      clinicPincode: '400058',
      clinicPhone: '+91 22-2345-6789',
      whatsappNumber: '8824193820',
    });
    console.log('👩‍⚕️ Created demo doctor:', doctor.email);

    // Create demo services
    const services = await Service.insertMany([
      {
        name: 'Comprehensive Exam',
        description: 'Complete dental examination including digital X-rays, oral cancer screening, and customized treatment plan.',
        icon: '🦷',
        duration: '45 mins',
        price: 1500,
        category: SERVICE_CATEGORIES.PREVENTIVE,
        sortOrder: 1,
      },
      {
        name: 'Professional Teeth Cleaning',
        description: 'Thorough cleaning to remove plaque, tartar, and surface stains, preventing gum disease and cavities.',
        icon: '✨',
        duration: '60 mins',
        price: 1200,
        category: SERVICE_CATEGORIES.PREVENTIVE,
        sortOrder: 2,
      },
      {
        name: 'Teeth Whitening',
        description: 'Professional in-office whitening treatment for a noticeably brighter, more confident smile.',
        icon: '💎',
        duration: '90 mins',
        price: 3500,
        category: SERVICE_CATEGORIES.COSMETIC,
        sortOrder: 3,
      },
      {
        name: 'Dental Implants',
        description: 'Permanent, natural-looking replacement for missing teeth, restoring full function and aesthetics.',
        icon: '🔩',
        duration: '120 mins',
        price: 25000,
        category: SERVICE_CATEGORIES.RESTORATIVE,
        sortOrder: 4,
      },
      {
        name: 'Invisalign Clear Aligners',
        description: 'Virtually invisible orthodontic treatment to straighten teeth without traditional metal braces.',
        icon: '😁',
        duration: '30 mins',
        price: 45000,
        category: SERVICE_CATEGORIES.ORTHODONTIC,
        sortOrder: 5,
      },
      {
        name: 'Porcelain Veneers',
        description: 'Custom-made ultra-thin shells to cover the front surface of teeth, instantly perfecting your smile.',
        icon: '🌟',
        duration: '90 mins',
        price: 12000,
        category: SERVICE_CATEGORIES.COSMETIC,
        sortOrder: 6,
      },
    ]);
    console.log(`📋 Created ${services.length} demo services`);

    // Create demo patients
    const patients = await Patient.insertMany([
      { name: 'Rahul Verma', phone: '+91 98765-10001', email: 'rahul@email.com' },
      { name: 'Priya Patel', phone: '+91 98765-10002', email: 'priya@email.com' },
      { name: 'Amit Kumar', phone: '+91 98765-10003', email: '' },
      { name: 'Neha Singh', phone: '+91 98765-10004', email: 'neha.s@email.com' },
    ]);
    console.log(`👥 Created ${patients.length} demo patients`);

    // Create demo appointments
    const today = new Date();
    const appointments = [];
    const statuses = ['pending', 'confirmed', 'completed', 'completed'];
    const timeSlots = ['09:30 AM', '10:00 AM', '11:00 AM', '02:00 PM'];

    for (let i = 0; i < 4; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() + (i < 2 ? 0 : -1)); // First 2 are today, rest are past
      appointments.push({
        patientId: patients[i]._id,
        date,
        timeSlot: timeSlots[i],
        serviceId: services[i % services.length]._id,
        status: statuses[i],
      });
    }

    await Appointment.insertMany(appointments);
    console.log(`📅 Created ${appointments.length} demo appointments`);

    // Create demo testimonials
    const testimonials = await Testimonial.insertMany([
      {
        patientName: 'Rahul Verma',
        rating: 5,
        comment: 'Dr. Sharma is amazing! The clinic is spotless, the staff is friendly, and my teeth whitening results were phenomenal.',
        treatmentType: 'Teeth Whitening',
      },
      {
        patientName: 'Priya Patel',
        rating: 5,
        comment: 'I usually have severe dental anxiety, but the team here made me feel incredibly relaxed. Painless experience!',
        treatmentType: 'Comprehensive Exam',
      },
      {
        patientName: 'Amit Kumar',
        rating: 4,
        comment: 'Great service and very professional. The online booking system made scheduling super easy.',
        treatmentType: 'Teeth Cleaning',
      },
    ]);
    console.log(`⭐ Created ${testimonials.length} demo testimonials`);

    // Create demo gallery items
    const galleryItems = await GalleryItem.insertMany([
      // --- PREVENTIVE (3) ---
      {
        title: 'Professional Stain Removal',
        description: 'Complete removal of tobacco and coffee stains through advanced cleaning.',
        beforeImage: '/images/cleaning-before.png',
        afterImage: '/images/cleaning-after.png',
        category: 'Preventive',
        sortOrder: 1,
      },
      {
        title: 'Gingivitis Treatment',
        description: 'Advanced therapy to reverse gum inflammation and restore tissue health.',
        beforeImage: '/images/gingivitis-before.png',
        afterImage: '/images/gingivitis-after.png',
        category: 'Preventive',
        sortOrder: 2,
      },
      {
        title: 'Deep Tartar Scaling',
        description: 'Thorough removal of hardened calculus to prevent periodontal disease.',
        beforeImage: '/images/tartar-before.png',
        afterImage: '/images/tartar-after.png',
        category: 'Preventive',
        sortOrder: 3,
      },

      // --- COSMETIC (3) ---
      {
        title: 'Complete Smile Makeover',
        description: 'Professional whitening and contouring for a bright, confident smile.',
        beforeImage: '/images/whitening-before.png',
        afterImage: '/images/whitening-after.png',
        category: 'Cosmetic',
        sortOrder: 4,
      },
      {
        title: 'Porcelain Veneers',
        description: 'Custom-made veneers to correct shape, size, and permanent discoloration.',
        beforeImage: '/images/veneers-before.png',
        afterImage: '/images/veneers-after.png',
        category: 'Cosmetic',
        sortOrder: 5,
      },
      {
        title: 'Laser Gum Contouring',
        description: 'Reshaping the gum line to eliminate a gummy smile and lengthen teeth.',
        beforeImage: '/images/gums-before.png',
        afterImage: '/images/gums-after.png',
        category: 'Cosmetic',
        sortOrder: 6,
      },

      // --- RESTORATIVE (3) ---
      {
        title: 'Single Tooth Implant',
        description: 'Permanent replacement for a missing tooth that looks and feels natural.',
        beforeImage: '/images/implant-before.png',
        afterImage: '/images/implant-after.png',
        category: 'Restorative',
        sortOrder: 7,
      },
      {
        title: 'Porcelain Dental Crown',
        description: 'Restoring a fractured tooth with a durable, high-strength ceramic crown.',
        beforeImage: 'https://images.pexels.com/photos/3845945/pexels-photo-3845945.jpeg?auto=compress&cs=tinysrgb&w=800',
        afterImage: 'https://images.pexels.com/photos/3845954/pexels-photo-3845954.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Restorative',
        sortOrder: 8,
      },
      {
        title: 'Fixed Dental Bridge',
        description: 'Closing a multi-tooth gap with a custom-fabricated porcelain bridge.',
        beforeImage: 'https://images.pexels.com/photos/15073697/pexels-photo-15073697.jpeg?auto=compress&cs=tinysrgb&w=800',
        afterImage: 'https://images.pexels.com/photos/4269690/pexels-photo-4269690.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Restorative',
        sortOrder: 9,
      },

      // --- ORTHODONTIC (3) ---
      {
        title: 'Clear Aligner Alignment',
        description: 'Straightening severe overcrowding discreetly using clear aligners.',
        beforeImage: 'https://images.pexels.com/photos/12474261/pexels-photo-12474261.jpeg?auto=compress&cs=tinysrgb&w=800',
        afterImage: 'https://images.unsplash.com/photo-1660732205495-f65510d8180e?fm=jpg&q=60&w=1200&auto=format&fit=crop',
        category: 'Orthodontic',
        sortOrder: 10,
      },
      {
        title: 'Traditional Ceramic Braces',
        description: 'Correcting misalignment using discreet ceramic brackets.',
        beforeImage: '/images/ortho-before.png',
        afterImage: '/images/ortho-after.png',
        category: 'Orthodontic',
        sortOrder: 11,
      },
      {
        title: 'Diastema Space Closure',
        description: 'Closing a prominent gap between front teeth for a uniform smile.',
        beforeImage: 'https://images.pexels.com/photos/3845856/pexels-photo-3845856.jpeg?auto=compress&cs=tinysrgb&w=800',
        afterImage: 'https://images.pexels.com/photos/3845855/pexels-photo-3845855.jpeg?auto=compress&cs=tinysrgb&w=800',
        category: 'Orthodontic',
        sortOrder: 12,
      },
    ]);
    console.log(`🖼️  Created ${galleryItems.length} demo gallery items`);

    console.log('\n✅ Database seeded successfully!');
    console.log('📋 Demo Login Credentials:');
    console.log('   Email: dr.ananya@smilecare.com');
    console.log('   Password: password123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedData();
