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
      <label for="start-time">Start Time</label>
      <input id="start-time" v-model="startTime" type="time" />
    </div>
    <div class="form-group">
      <label for="end-time">End Time</label>
      <input id="end-time" v-model="endTime" type="time" />
    </div>
    <div class="buttons">
      <button class="btn confirm" @click="confirmSchedule">Confirm</button>
      <button class="btn close" @click="closeForm">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['add-schedule', 'close']);

const title = ref('');
const description = ref('');
const startTime = ref('');
const endTime = ref('');

const confirmSchedule = () => {
  if (!title.value || !startTime.value || !endTime.value) {
    alert('Please fill all required fields.');
    return;
  }

  const newEvent = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    startTime: startTime.value,
    endTime: endTime.value,
  };

  emit('add-schedule', newEvent);
  clearForm();
};

const closeForm = () => {
  emit('close');
  clearForm();
};

const clearForm = () => {
  title.value = '';
  description.value = '';
  startTime.value = '';
  endTime.value = '';
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
