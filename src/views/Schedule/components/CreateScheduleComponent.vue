<template>
  <div class="create-schedule">
    <div class="form-group">
      <label for="title">Title</label>
      <input id="title" v-model="title" type="text" placeholder="Enter title" />
    </div>
    <div class="form-group">
      <label for="description">Description</label>
      <input id="description" v-model="description" type="text" placeholder="Enter description" />
    </div>
    <div class="form-group">
      <label>Start Time</label>
      <!-- <input id="start-time" v-model="startTime" type="time" /> -->
      <VDatePicker v-model="startTime" id="start-time" mode="time" :rules="timeRules" />
    </div>
    <div class="form-group">
      <label>End Time</label>
      <VDatePicker v-model="endTime" id="end-time" mode="time" :rules="timeRules" />
      <!-- <input id="end-time" v-model="endTime" type="time" /> -->
    </div>
    <div class="buttons">
      <button class="btn confirm" @click="confirmSchedule">Confirm</button>
      <button class="btn close" @click="closeForm">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
// Import the VDatePicker component if it's not already imported
// import VDatePicker from 'path-to-your-component/VDatePicker.vue';

// Props to receive initial event data if in edit mode
const props = defineProps({
  initialEvent: {
    type: Object,
    default: () => null,
  },
});
const timeRules = ref({
  minutes: { interval: 15 }
})
const emit = defineEmits(['add-schedule', 'update-schedule', 'close']);

// Reactive form fields
const title = ref('');
const description = ref('');
const startTime = ref(new Date());
const endTime = ref(new Date());

// Parsing utility to convert time strings to Date objects compatible with VDatePicker
const parseTimeString = (timeString, date = new Date()) => {
  const [hours, minutes] = timeString.split(':').map(Number);
  const parsedDate = new Date(date);
  parsedDate.setHours(hours, minutes, 0, 0);
  return parsedDate;
};
// Utility function to format date object into "HH:mm" time string
const formatTime = (date) => {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

// Watch the initialEvent prop and pre-fill the form fields when provided
watch(() => props.initialEvent, (newEvent) => {
  if (newEvent) {
    title.value = newEvent.title;
    description.value = newEvent.details;
    startTime.value = parseTimeString(newEvent.startTime, newEvent.start); // Assuming 'start' is the base date for time parsing
    endTime.value = parseTimeString(newEvent.endTime, newEvent.start); // Assuming 'start' is the base date for time parsing
  }
}, { immediate: true });

// Function to clear the form fields
const clearForm = () => {
  title.value = '';
  description.value = '';
  startTime.value = new Date();
  endTime.value = new Date();
};

// Confirm the schedule and emit the appropriate event
const confirmSchedule = () => {
  if (!title.value || !startTime.value || !endTime.value) {
    alert('Please fill all required fields.');
    return;
  }

  // Ensure startTime is before endTime
  if (startTime.value >= endTime.value) {
    alert('Start time must be before end time.');
    return;
  }

  const eventDetails = {
    id: props.initialEvent ? props.initialEvent.id : Date.now(),
    title: title.value,
    description: description.value,
    startTime: formatTime(startTime.value), // Convert to a suitable format if needed
    endTime: formatTime(endTime.value), // Convert to a suitable format if needed
  };

  if (props.initialEvent) {
    emit('update-schedule', eventDetails); // Emit update event in edit mode
  } else {
    emit('add-schedule', eventDetails); // Emit add event in create mode
  }

  clearForm();
};

const closeForm = () => {
  emit('close');
  clearForm();
};
</script>

<style scoped>
.create-schedule {
  padding: 1rem;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

.buttons {
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn.confirm {
  background-color: #8bc34a;
  color: white;
}

.btn.close {
  background-color: #607d8b;
  color: white;
}

.btn:hover {
  opacity: 0.8;
}
</style>
