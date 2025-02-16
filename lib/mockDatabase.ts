interface User {
    id: string
    name: string
    email: string
    password: string
    role: string
    avatar: string
    settings: {
      emailNotifications: boolean
      pushNotifications: boolean
      darkMode: boolean
    }
  }
  
  class MockDatabase {
    private users: User[]
    private storageKey = 'mockDB_users'
  
    constructor() {
      this.users = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          password: "password123",
          role: "Manager",
          avatar: "/avatars/01.png",
          settings: {
            emailNotifications: true,
            pushNotifications: false,
            darkMode: false,
          },
        }
      ]
  
      // Only try to use localStorage in the browser
      if (typeof window !== 'undefined') {
        const savedUsers = localStorage.getItem(this.storageKey)
        if (savedUsers) {
          this.users = JSON.parse(savedUsers)
        } else {
          this.saveToStorage()
        }
      }
    }
  
    private saveToStorage() {
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.storageKey, JSON.stringify(this.users))
      }
    }
  
    getUser(email: string): User | undefined {
      return this.users.find((user) => user.email === email)
    }
  
    updateUser(email: string, updates: Partial<User>): User | undefined {
      const userIndex = this.users.findIndex((user) => user.email === email)
      if (userIndex !== -1) {
        // If email is being updated, we need to check if it's not already taken
        if (updates.email && updates.email !== email) {
          const emailExists = this.users.some(user => user.email === updates.email)
          if (emailExists) {
            return undefined // Email already taken
          }
        }

        // Create updated user with all fields preserved
        const updatedUser = {
          ...this.users[userIndex],
          ...updates,
          settings: {
            ...this.users[userIndex].settings,
            ...(updates.settings || {})
          }
        }
        
        this.users[userIndex] = updatedUser
        this.saveToStorage()
        return updatedUser
      }
      return undefined
    }
  
    authenticate(email: string, password: string): User | undefined {
      return this.users.find((user) => user.email === email && user.password === password)
    }
  
    updatePassword(email: string, currentPassword: string, newPassword: string): boolean {
      const user = this.authenticate(email, currentPassword)
      if (user) {
        const userIndex = this.users.findIndex((u) => u.email === email)
        this.users[userIndex].password = newPassword
        this.saveToStorage()
        return true
      }
      return false
    }
    getDailySummary() {
      return {
        totalCoffees: 289,
        peakHour: "10:00 AM - 11:00 AM",
        avgCustomerStay: "24 minutes",
        employeeProductivity: "High"
      }
    }
  }
  


  const mockDB = new MockDatabase()

  
  export default mockDB
  
  